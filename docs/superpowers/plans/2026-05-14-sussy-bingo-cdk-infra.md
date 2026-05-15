# Sussy Bingo CDK Infrastructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a self-contained `infra/` CDK app that deploys and tears down the Sussy Bingo WebSocket relay backend (API Gateway WebSocket + Lambda + DynamoDB) with single commands.

**Architecture:** One CDK stack (`SussyBingoStack`) in `us-east-1`. A WebSocket API with three routes (`$connect`, `$disconnect`, `$default`) all backed by one `NodejsFunction` Lambda. Connections are tracked in a `PAY_PER_REQUEST` DynamoDB table with TTL and `RemovalPolicy.DESTROY` so `cdk destroy` removes everything. The `$default` route fan-outs messages to every connection except the sender and reaps `410 Gone` connections inline.

**Tech Stack:** AWS CDK v2 (TypeScript), `aws-cdk-lib`, `aws-lambda-nodejs` (esbuild bundling), Node 20 Lambda runtime, AWS SDK v3 (`@aws-sdk/client-dynamodb`, `@aws-sdk/lib-dynamodb`, `@aws-sdk/client-apigatewaymanagementapi`).

**Reference:** `../mtgmakedeckforme/infra/` mirrors the conventions we want — esbuild bundling, dotenv-driven account/region, NodejsFunction usage.

**Spec:** `docs/superpowers/specs/2026-05-14-sussy-bingo-cdk-infra-design.md`

---

## File Structure

```
infra/
  bin/infra.ts                   # CDK app entry
  lib/sussy-bingo-stack.ts       # Stack definition
  lambda/websocket-handler.ts    # Single Lambda for $connect/$disconnect/$default
  package.json
  cdk.json
  tsconfig.json
  .gitignore
```

Each file has one job: `bin/infra.ts` instantiates the stack, `lib/sussy-bingo-stack.ts` declares resources, `lambda/websocket-handler.ts` contains all runtime logic. No cross-file abstractions — the Lambda is small enough that one file is the right size.

---

## Task 1: Scaffold the infra folder

**Files:**
- Create: `infra/.gitignore`
- Create: `infra/package.json`
- Create: `infra/tsconfig.json`
- Create: `infra/cdk.json`

- [ ] **Step 1: Create `infra/.gitignore`**

```
node_modules/
dist/
cdk.out/
*.d.ts
*.js
!jest.config.js
.env
.env.local
```

- [ ] **Step 2: Create `infra/package.json`**

```json
{
  "name": "sussy-bingo-infra",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc",
    "cdk": "cdk",
    "synth": "cdk synth",
    "deploy": "cdk deploy",
    "destroy": "cdk destroy"
  },
  "dependencies": {
    "aws-cdk-lib": "^2.170.0",
    "constructs": "^10.4.0",
    "dotenv": "^16.4.5",
    "esbuild": "^0.24.0",
    "@aws-sdk/client-apigatewaymanagementapi": "^3.700.0",
    "@aws-sdk/client-dynamodb": "^3.700.0",
    "@aws-sdk/lib-dynamodb": "^3.700.0"
  },
  "devDependencies": {
    "@types/aws-lambda": "^8.10.145",
    "@types/node": "^20.0.0",
    "aws-cdk": "^2.170.0",
    "ts-node": "^10.9.2",
    "typescript": "~5.6.2"
  }
}
```

- [ ] **Step 3: Create `infra/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "dist",
    "rootDir": ".",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["bin/**/*.ts", "lib/**/*.ts", "lambda/**/*.ts"]
}
```

- [ ] **Step 4: Create `infra/cdk.json`**

```json
{
  "app": "npx ts-node --prefer-ts-exts bin/infra.ts"
}
```

- [ ] **Step 5: Install dependencies**

Run from `infra/`:
```bash
npm install
```

Expected: completes without errors; `node_modules/` and `package-lock.json` created.

- [ ] **Step 6: Commit**

```bash
git add infra/.gitignore infra/package.json infra/package-lock.json infra/tsconfig.json infra/cdk.json
git commit -m "Scaffold CDK infra folder with deps and tsconfig"
```

---

## Task 2: CDK app entry point

**Files:**
- Create: `infra/bin/infra.ts`

- [ ] **Step 1: Create `infra/bin/infra.ts`**

```typescript
#!/usr/bin/env node
import 'source-map-support/register';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env.local') });
import * as cdk from 'aws-cdk-lib';
import { SussyBingoStack } from '../lib/sussy-bingo-stack';

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
};

new SussyBingoStack(app, 'SussyBingo', { env });
```

- [ ] **Step 2: Verify it compiles**

Run from `infra/`:
```bash
npx tsc --noEmit
```

Expected: errors about `../lib/sussy-bingo-stack` not existing (Task 3 fixes this). That is acceptable — confirms the toolchain works but the import is missing.

- [ ] **Step 3: Commit**

```bash
git add infra/bin/infra.ts
git commit -m "Add CDK app entry instantiating SussyBingoStack"
```

---

## Task 3: Stack — DynamoDB connections table

**Files:**
- Create: `infra/lib/sussy-bingo-stack.ts`

This task creates only the table so we can synth incrementally. Lambda and WebSocket API are added in later tasks.

- [ ] **Step 1: Create `infra/lib/sussy-bingo-stack.ts` with just the table**

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class SussyBingoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const connectionsTable = new dynamodb.Table(this, 'Connections', {
      tableName: 'sussy-bingo-connections',
      partitionKey: { name: 'connectionId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda and WebSocket API added in later tasks
    void connectionsTable;
  }
}
```

- [ ] **Step 2: Synth to verify**

Run from `infra/`:
```bash
npx cdk synth
```

Expected: prints CloudFormation YAML/JSON to stdout containing `AWS::DynamoDB::Table` with `TableName: sussy-bingo-connections` and `TimeToLiveSpecification`. No errors.

- [ ] **Step 3: Commit**

```bash
git add infra/lib/sussy-bingo-stack.ts
git commit -m "Add Connections DynamoDB table to SussyBingoStack"
```

---

## Task 4: Lambda handler — connect / disconnect

**Files:**
- Create: `infra/lambda/websocket-handler.ts`

We implement the easy two routes first; `$default` (the fan-out) comes in Task 5 so the diff stays reviewable.

- [ ] **Step 1: Create `infra/lambda/websocket-handler.ts`**

```typescript
import type {
  APIGatewayProxyWebsocketEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = process.env.TABLE_NAME!;
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const TTL_SECONDS = 24 * 60 * 60;

export const handler = async (
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const { routeKey, connectionId } = event.requestContext;

  try {
    switch (routeKey) {
      case '$connect':
        await ddb.send(new PutCommand({
          TableName: TABLE_NAME,
          Item: {
            connectionId,
            ttl: Math.floor(Date.now() / 1000) + TTL_SECONDS,
          },
        }));
        return { statusCode: 200, body: 'connected' };

      case '$disconnect':
        await ddb.send(new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { connectionId },
        }));
        return { statusCode: 200, body: 'disconnected' };

      default:
        // $default fan-out implemented in next task
        return { statusCode: 200, body: 'ok' };
    }
  } catch (err) {
    console.error('handler error', { routeKey, connectionId, err });
    return { statusCode: 200, body: 'error-logged' };
  }
};
```

Note: errors return 200 deliberately — returning 5xx causes API Gateway to close the client's socket, which is worse than logging and moving on (per spec, "Error handling" section).

- [ ] **Step 2: Verify it compiles**

Run from `infra/`:
```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add infra/lambda/websocket-handler.ts
git commit -m "Add Lambda handler for \$connect and \$disconnect"
```

---

## Task 5: Lambda handler — `$default` fan-out

**Files:**
- Modify: `infra/lambda/websocket-handler.ts`

The client wraps payloads as `{ body: <json-string> }` (see `src/app/services/web-socket.service.ts:32`). API Gateway delivers the *outer* JSON as `event.body` (a string). So the Lambda must `JSON.parse(event.body)`, then take `.body` (which is itself a JSON string the client sent), and re-stringify *that* to forward to other clients. We forward the inner payload verbatim — that's what the client's `handleQuoteMessageFromServer` / `handleAnswerMessageFromServer` expect.

- [ ] **Step 1: Replace the file with the full handler**

Replace the contents of `infra/lambda/websocket-handler.ts` with:

```typescript
import type {
  APIGatewayProxyWebsocketEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  DeleteCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
  GoneException,
} from '@aws-sdk/client-apigatewaymanagementapi';

const TABLE_NAME = process.env.TABLE_NAME!;
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const TTL_SECONDS = 24 * 60 * 60;

export const handler = async (
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const { routeKey, connectionId, domainName, stage } = event.requestContext;

  try {
    switch (routeKey) {
      case '$connect':
        await ddb.send(new PutCommand({
          TableName: TABLE_NAME,
          Item: {
            connectionId,
            ttl: Math.floor(Date.now() / 1000) + TTL_SECONDS,
          },
        }));
        return { statusCode: 200, body: 'connected' };

      case '$disconnect':
        await ddb.send(new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { connectionId },
        }));
        return { statusCode: 200, body: 'disconnected' };

      default:
        await fanOut({
          senderConnectionId: connectionId,
          rawBody: event.body ?? '',
          endpoint: `https://${domainName}/${stage}`,
        });
        return { statusCode: 200, body: 'ok' };
    }
  } catch (err) {
    console.error('handler error', { routeKey, connectionId, err });
    return { statusCode: 200, body: 'error-logged' };
  }
};

async function fanOut(args: {
  senderConnectionId: string;
  rawBody: string;
  endpoint: string;
}): Promise<void> {
  const inner = unwrapClientBody(args.rawBody);
  if (inner === null) {
    console.warn('unparseable message body', { rawBody: args.rawBody });
    return;
  }

  const apigw = new ApiGatewayManagementApiClient({ endpoint: args.endpoint });

  const scan = await ddb.send(new ScanCommand({
    TableName: TABLE_NAME,
    ProjectionExpression: 'connectionId',
  }));
  const ids: string[] = (scan.Items ?? [])
    .map((i) => i.connectionId as string)
    .filter((id) => id && id !== args.senderConnectionId);

  const payload = Buffer.from(JSON.stringify({ message: inner }));

  await Promise.all(ids.map(async (id) => {
    try {
      await apigw.send(new PostToConnectionCommand({
        ConnectionId: id,
        Data: payload,
      }));
    } catch (err) {
      if (err instanceof GoneException) {
        await ddb.send(new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { connectionId: id },
        })).catch((e) => console.error('cleanup failed', { id, e }));
      } else {
        console.error('post failed', { id, err });
      }
    }
  }));
}

function unwrapClientBody(rawBody: string): unknown {
  // Client sends socket.send(JSON.stringify({ body: message }))
  // → API Gateway delivers that JSON string as event.body
  // → we parse it, then return the inner `.body` for forwarding
  try {
    const outer = JSON.parse(rawBody);
    if (outer && typeof outer === 'object' && 'body' in outer) {
      return (outer as { body: unknown }).body;
    }
    return outer;
  } catch {
    return null;
  }
}
```

Note on the wire format: the client's `handleQuoteMessageFromServer` reads `response.message.messageType` (see `src/app/app.component.ts:111`), so we wrap the forwarded payload in `{ message: ... }`. That matches the existing client and is the contract we have to honor.

- [ ] **Step 2: Verify it compiles**

Run from `infra/`:
```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add infra/lambda/websocket-handler.ts
git commit -m "Implement \$default fan-out with 410 cleanup"
```

---

## Task 6: Wire the Lambda into the stack

**Files:**
- Modify: `infra/lib/sussy-bingo-stack.ts`

- [ ] **Step 1: Replace `infra/lib/sussy-bingo-stack.ts` with the table + Lambda**

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

export class SussyBingoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const connectionsTable = new dynamodb.Table(this, 'Connections', {
      tableName: 'sussy-bingo-connections',
      partitionKey: { name: 'connectionId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const handlerFn = new nodejs.NodejsFunction(this, 'WebSocketHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '..', 'lambda', 'websocket-handler.ts'),
      handler: 'handler',
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      environment: {
        TABLE_NAME: connectionsTable.tableName,
      },
      bundling: {
        minify: true,
        sourceMap: true,
      },
    });

    connectionsTable.grantReadWriteData(handlerFn);

    // WebSocket API + permissions added in next task
    void handlerFn;
  }
}
```

- [ ] **Step 2: Synth to verify**

Run from `infra/`:
```bash
npx cdk synth
```

Expected: CloudFormation output now contains `AWS::Lambda::Function` and an IAM role that has DynamoDB read/write on the Connections table. No errors.

- [ ] **Step 3: Commit**

```bash
git add infra/lib/sussy-bingo-stack.ts
git commit -m "Add WebSocketHandler Lambda to stack"
```

---

## Task 7: WebSocket API and route integrations

**Files:**
- Modify: `infra/lib/sussy-bingo-stack.ts`

CDK v2 keeps API Gateway WebSocket constructs in the `aws-cdk-lib/aws-apigatewayv2` alpha module historically, but as of CDK 2.170 the stable WebSocket constructs live in `aws-cdk-lib/aws-apigatewayv2` and integrations in `aws-cdk-lib/aws-apigatewayv2-integrations`. If those imports fail at synth time, drop in the alpha packages `@aws-cdk/aws-apigatewayv2-alpha` and `@aws-cdk/aws-apigatewayv2-integrations-alpha` at versions matching the CDK lib version — but try the stable paths first.

- [ ] **Step 1: Replace `infra/lib/sussy-bingo-stack.ts` with the complete stack**

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as path from 'path';

export class SussyBingoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const connectionsTable = new dynamodb.Table(this, 'Connections', {
      tableName: 'sussy-bingo-connections',
      partitionKey: { name: 'connectionId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const handlerFn = new nodejs.NodejsFunction(this, 'WebSocketHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '..', 'lambda', 'websocket-handler.ts'),
      handler: 'handler',
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      environment: {
        TABLE_NAME: connectionsTable.tableName,
      },
      bundling: {
        minify: true,
        sourceMap: true,
      },
    });

    connectionsTable.grantReadWriteData(handlerFn);

    const integration = new integrations.WebSocketLambdaIntegration(
      'HandlerIntegration',
      handlerFn,
    );

    const api = new apigwv2.WebSocketApi(this, 'SussyBingoApi', {
      apiName: 'sussy-bingo',
      connectRouteOptions: { integration },
      disconnectRouteOptions: { integration },
      defaultRouteOptions: { integration },
    });

    const stage = new apigwv2.WebSocketStage(this, 'ProductionStage', {
      webSocketApi: api,
      stageName: 'production',
      autoDeploy: true,
    });

    // Allow the Lambda to call back via @connections/*
    api.grantManageConnections(handlerFn);

    new cdk.CfnOutput(this, 'WebSocketUrl', {
      value: stage.url,
      description: 'Paste this into src/app/app.component.ts:106 (wsUrl)',
    });
  }
}
```

- [ ] **Step 2: Synth to verify**

Run from `infra/`:
```bash
npx cdk synth
```

Expected: CloudFormation includes `AWS::ApiGatewayV2::Api` with `ProtocolType: WEBSOCKET`, three `AWS::ApiGatewayV2::Route` resources (`$connect`, `$disconnect`, `$default`), a `Stage` named `production`, and a `CfnOutput` named `WebSocketUrl`. No errors.

If the `aws-apigatewayv2` import fails: install alpha packages with the matching version, e.g. `npm install @aws-cdk/aws-apigatewayv2-alpha@2.114.1-alpha.0 @aws-cdk/aws-apigatewayv2-integrations-alpha@2.114.1-alpha.0` (use a version matching your `aws-cdk-lib`), and change the imports to those module paths. The construct API is identical.

- [ ] **Step 3: Commit**

```bash
git add infra/lib/sussy-bingo-stack.ts
git commit -m "Wire WebSocket API routes to Lambda integration"
```

---

## Task 8: Bootstrap and deploy

**Files:** none

This is a one-time verification that the stack deploys end-to-end against your AWS account. Skip if you don't have AWS credentials handy — Tasks 1-7 produce a valid synthesized stack on their own.

- [ ] **Step 1: Confirm credentials and account**

Run:
```bash
aws sts get-caller-identity
```

Expected: prints your account ID and ARN. If it errors, fix credentials before continuing.

- [ ] **Step 2: Bootstrap CDK in us-east-1 (one-time per account/region)**

Run from `infra/`:
```bash
npx cdk bootstrap aws://<ACCOUNT_ID>/us-east-1
```

Skip if you've already bootstrapped this account/region for another project (the mtgmakedeckforme infra would have done it).

Expected: "Environment aws://…/us-east-1 bootstrapped" or "already bootstrapped".

- [ ] **Step 3: Deploy**

Run from `infra/`:
```bash
npm run deploy
```

Expected: CloudFormation creates the stack and prints:
```
Outputs:
SussyBingo.WebSocketUrl = wss://<api-id>.execute-api.us-east-1.amazonaws.com/production/
```

Save that URL.

- [ ] **Step 4: Smoke test the live API**

Open two terminal windows. In each, install `wscat` if needed (`npm install -g wscat`) and connect:

```bash
wscat -c wss://<api-id>.execute-api.us-east-1.amazonaws.com/production/
```

In terminal A, send a quote-shaped message — exactly as the client would (note the `{body: ...}` outer wrap because that's what `web-socket.service.ts:32` produces):

```json
{"body":{"messageType":"quote","quote":"\"test\"","index":1,"possibleAnswers":["A","B"]}}
```

Expected in terminal B:
```json
{"message":{"messageType":"quote","quote":"\"test\"","index":1,"possibleAnswers":["A","B"]}}
```

Terminal A should NOT receive its own echo.

Close both terminals — DynamoDB should clear the connections within seconds (`$disconnect` route).

- [ ] **Step 5: Tear it down**

Run from `infra/`:
```bash
npm run destroy
```

Confirm with `y` when prompted. Expected: stack deletes cleanly, DynamoDB table is gone (`RemovalPolicy.DESTROY`).

---

## Task 9: Update the client URL and document the workflow

**Files:**
- Modify: `src/app/app.component.ts:106`
- Modify: `CLAUDE.md`

This task only happens after Task 8 has produced a real URL. If you skipped Task 8, leave the URL alone — it can be updated next time the stack is actually deployed.

- [ ] **Step 1: Update `src/app/app.component.ts:106` with the deployed URL**

Change the line:
```typescript
const wsUrl = 'wss://3i2b1n43s9.execute-api.us-east-1.amazonaws.com/production/';
```

to use the `WebSocketUrl` value from `cdk deploy` output. (Skip this step if Task 8 was skipped.)

- [ ] **Step 2: Add an `Infra` section to `CLAUDE.md`**

Append to the bottom of `CLAUDE.md`:

```markdown
## Infra (`infra/`)

CDK app that stands up the game's backend: API Gateway WebSocket + Lambda relay + DynamoDB connection table. Brought up before a game session and torn down after.

- `cd infra && npm run deploy` — deploys `SussyBingoStack`, outputs `WebSocketUrl`
- Paste that URL into `src/app/app.component.ts:106` and redeploy the gh-pages frontend
- `cd infra && npm run destroy` — tears everything down (DynamoDB table is `RemovalPolicy.DESTROY`)

One Lambda (`infra/lambda/websocket-handler.ts`) handles all three routes. `$default` parses the client's `{body: <payload>}` wrapper, re-wraps as `{message: <payload>}`, and fan-outs to every connection except the sender; `410 Gone` responses cause the connection row to be deleted.
```

- [ ] **Step 3: Commit**

```bash
git add src/app/app.component.ts CLAUDE.md
git commit -m "Point client at CDK-deployed WebSocket URL; document infra"
```

(If you skipped the client change in Step 1, only `CLAUDE.md` will be staged — that's fine.)

---

## Self-review notes

- **Spec coverage:**
  - Architecture (one stack, three routes, one Lambda, DynamoDB w/ TTL + DESTROY): Tasks 3, 6, 7
  - Game-day workflow (deploy / destroy / CfnOutput): Tasks 7, 8, 9
  - 410 cleanup of stale connections: Task 5
  - Client's `{body: ...}` wrapping unwrap: Task 5
  - Folder layout matches spec: Tasks 1-7
  - SnsService excluded: nothing references it — correct.
- **Out-of-scope items from spec are not in this plan:** auth, persistence, env config for ws URL, custom domain — confirmed absent.
- **Naming consistency:** `connectionsTable`, `handlerFn`, `integration`, `api`, `stage` used consistently across Tasks 3/6/7. The Lambda's env var `TABLE_NAME` is set in Task 6 and read in Tasks 4/5.
