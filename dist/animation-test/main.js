"use strict";
(self["webpackChunkanimationTest"] = self["webpackChunkanimationTest"] || []).push([["main"],{

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _pages_landing_landing_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/landing/landing.component */ 2768);
/* harmony import */ var _pages_player_player_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/player/player.component */ 3500);
/* harmony import */ var _pages_host_host_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/host/host.component */ 538);
/* harmony import */ var _pages_cloud_cloud_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/cloud/cloud.component */ 766);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);







const routes = [
    { path: '', pathMatch: 'full', component: _pages_landing_landing_component__WEBPACK_IMPORTED_MODULE_0__.LandingComponent },
    { path: 'play', component: _pages_player_player_component__WEBPACK_IMPORTED_MODULE_1__.PlayerComponent },
    { path: 'host', component: _pages_host_host_component__WEBPACK_IMPORTED_MODULE_2__.HostComponent },
    { path: 'cloud', component: _pages_cloud_cloud_component__WEBPACK_IMPORTED_MODULE_3__.CloudComponent },
    { path: '**', redirectTo: '' },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 2816);


class AppComponent {
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _services_tokens_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/tokens.service */ 699);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _pages_landing_landing_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/landing/landing.component */ 2768);
/* harmony import */ var _pages_player_player_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/player/player.component */ 3500);
/* harmony import */ var _pages_host_host_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/host/host.component */ 538);
/* harmony import */ var _pages_cloud_cloud_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/cloud/cloud.component */ 766);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3598);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/icon */ 5590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/button */ 7317);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _components_error_page_error_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/error-page/error-page.component */ 4262);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var _components_word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/word-cloud/word-cloud.component */ 7327);
/* harmony import */ var angular_d3_cloud__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! angular-d3-cloud */ 130);
/* harmony import */ var _pipes_dots_pipe_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pipes/dots-pipe.pipe */ 2440);
/* harmony import */ var _components_token_avatar_token_avatar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/token-avatar/token-avatar.component */ 8462);
/* harmony import */ var _components_token_picker_token_picker_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/token-picker/token-picker.component */ 2061);






















class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_12__.APP_INITIALIZER,
            multi: true,
            deps: [_services_tokens_service__WEBPACK_IMPORTED_MODULE_0__.TokensService],
            useFactory: (svc) => () => svc.load(),
        },
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_13__.BrowserModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormsModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_16__.HttpClientModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__.BrowserAnimationsModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__.MatIconModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_19__.MatButtonModule,
            angular_d3_cloud__WEBPACK_IMPORTED_MODULE_20__.AngularD3CloudModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent,
        _components_error_page_error_page_component__WEBPACK_IMPORTED_MODULE_7__.ErrorPageComponent,
        _components_word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_8__.WordCloudComponent,
        _pipes_dots_pipe_pipe__WEBPACK_IMPORTED_MODULE_9__.DotsPipe,
        _pages_landing_landing_component__WEBPACK_IMPORTED_MODULE_3__.LandingComponent,
        _pages_player_player_component__WEBPACK_IMPORTED_MODULE_4__.PlayerComponent,
        _pages_host_host_component__WEBPACK_IMPORTED_MODULE_5__.HostComponent,
        _pages_cloud_cloud_component__WEBPACK_IMPORTED_MODULE_6__.CloudComponent,
        _components_token_avatar_token_avatar_component__WEBPACK_IMPORTED_MODULE_10__.TokenAvatarComponent,
        _components_token_picker_token_picker_component__WEBPACK_IMPORTED_MODULE_11__.TokenPickerComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_13__.BrowserModule,
        _angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormsModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_16__.HttpClientModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__.BrowserAnimationsModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__.MatIconModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_19__.MatButtonModule,
        angular_d3_cloud__WEBPACK_IMPORTED_MODULE_20__.AngularD3CloudModule] }); })();


/***/ }),

/***/ 4262:
/*!***************************************************************!*\
  !*** ./src/app/components/error-page/error-page.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorPageComponent": () => (/* binding */ ErrorPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class ErrorPageComponent {
    constructor() { }
    ngOnInit() {
    }
}
ErrorPageComponent.ɵfac = function ErrorPageComponent_Factory(t) { return new (t || ErrorPageComponent)(); };
ErrorPageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ErrorPageComponent, selectors: [["app-error-page"]], decls: 2, vars: 0, template: function ErrorPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "error-page works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlcnJvci1wYWdlLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 8462:
/*!*******************************************************************!*\
  !*** ./src/app/components/token-avatar/token-avatar.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TokenAvatarComponent": () => (/* binding */ TokenAvatarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_tokens_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/tokens.service */ 699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6362);



function TokenAvatarComponent_img_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 3);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", ctx_r0.token.artCropUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"])("alt", ctx_r0.token.name);
} }
function TokenAvatarComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class TokenAvatarComponent {
    constructor(tokens) {
        this.tokens = tokens;
        this.tokenId = null;
        this.size = 'md';
    }
    get token() {
        return this.tokens.byId(this.tokenId);
    }
}
TokenAvatarComponent.ɵfac = function TokenAvatarComponent_Factory(t) { return new (t || TokenAvatarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_tokens_service__WEBPACK_IMPORTED_MODULE_0__.TokensService)); };
TokenAvatarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: TokenAvatarComponent, selectors: [["app-token-avatar"]], inputs: { tokenId: "tokenId", size: "size" }, decls: 4, vars: 8, consts: [[1, "avatar"], ["class", "avatar-img", 3, "src", "alt", 4, "ngIf", "ngIfElse"], ["placeholder", ""], [1, "avatar-img", 3, "src", "alt"], ["aria-label", "No avatar selected", 1, "avatar-placeholder"]], template: function TokenAvatarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, TokenAvatarComponent_img_1_Template, 1, 2, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, TokenAvatarComponent_ng_template_2_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("size-sm", ctx.size === "sm")("size-md", ctx.size === "md")("size-lg", ctx.size === "lg");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.token)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf], styles: [".avatar[_ngcontent-%COMP%] {\n  display: inline-block;\n  border-radius: 50%;\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.08);\n  flex-shrink: 0;\n}\n.avatar.size-sm[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n}\n.avatar.size-md[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n}\n.avatar.size-lg[_ngcontent-%COMP%] {\n  width: 96px;\n  height: 96px;\n}\n.avatar-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.avatar-placeholder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: rgba(255, 255, 255, 0.5);\n  font-weight: 600;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRva2VuLWF2YXRhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFDQUFBO0VBQ0EsY0FBQTtBQUNGO0FBQ0U7RUFBWSxXQUFBO0VBQWEsWUFBQTtBQUczQjtBQUZFO0VBQVksV0FBQTtFQUFhLFlBQUE7QUFNM0I7QUFMRTtFQUFZLFdBQUE7RUFBYSxZQUFBO0FBUzNCO0FBUEE7RUFDRSxXQUFBO0VBQWEsWUFBQTtFQUFjLGlCQUFBO0VBQW1CLGNBQUE7QUFhaEQ7QUFYQTtFQUNFLFdBQUE7RUFBYSxZQUFBO0VBQ2IsYUFBQTtFQUFlLG1CQUFBO0VBQXFCLHVCQUFBO0VBQ3BDLCtCQUFBO0VBQ0EsZ0JBQUE7QUFpQkYiLCJmaWxlIjoidG9rZW4tYXZhdGFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmF2YXRhciB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wOCk7XHJcbiAgZmxleC1zaHJpbms6IDA7XHJcblxyXG4gICYuc2l6ZS1zbSB7IHdpZHRoOiAzMnB4OyBoZWlnaHQ6IDMycHg7IH1cclxuICAmLnNpemUtbWQgeyB3aWR0aDogNDhweDsgaGVpZ2h0OiA0OHB4OyB9XHJcbiAgJi5zaXplLWxnIHsgd2lkdGg6IDk2cHg7IGhlaWdodDogOTZweDsgfVxyXG59XHJcbi5hdmF0YXItaW1nIHtcclxuICB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyBvYmplY3QtZml0OiBjb3ZlcjsgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuLmF2YXRhci1wbGFjZWhvbGRlciB7XHJcbiAgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 2061:
/*!*******************************************************************!*\
  !*** ./src/app/components/token-picker/token-picker.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TokenPickerComponent": () => (/* binding */ TokenPickerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_tokens_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/tokens.service */ 699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _token_avatar_token_avatar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../token-avatar/token-avatar.component */ 8462);





function TokenPickerComponent_button_4_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const t_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", (tmp_0_0 = ctx_r2.ownerOf(t_r1.id)) == null ? null : tmp_0_0.name, " ");
} }
function TokenPickerComponent_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function TokenPickerComponent_button_4_Template_button_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5); const t_r1 = restoredCtx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r4.onTileClick(t_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-token-avatar", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, TokenPickerComponent_button_4_div_4_Template, 2, 1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const t_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("taken", ctx_r0.isTakenByOther(t_r1.id))("mine", ctx_r0.isMine(t_r1.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-token-id", t_r1.id)("aria-label", t_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("tokenId", t_r1.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](t_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.isTakenByOther(t_r1.id));
} }
class TokenPickerComponent {
    constructor(tokensSvc) {
        this.tokensSvc = tokensSvc;
        this.myPlayerId = '';
        this.players = [];
        this.pick = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
        // Optimistic local pick so the spring animation fires immediately
        // on tap instead of waiting for the server's lobby_update echo.
        // `null` = no local override; `''` = locally cleared selection.
        this.localPickId = null;
    }
    ngOnChanges(changes) {
        var _a, _b;
        if (!changes['players'])
            return;
        // Once the server's view matches our optimistic pick (or we have no
        // pending pick), defer to server state.
        const serverMineId = (_b = (_a = this.players.find(p => p.playerId === this.myPlayerId)) === null || _a === void 0 ? void 0 : _a.tokenId) !== null && _b !== void 0 ? _b : '';
        if (this.localPickId !== null && serverMineId === this.localPickId) {
            this.localPickId = null;
        }
    }
    ownerOf(tokenId) {
        return this.players.find(p => p.tokenId === tokenId);
    }
    isMine(tokenId) {
        var _a;
        if (this.localPickId !== null)
            return this.localPickId === tokenId;
        return ((_a = this.ownerOf(tokenId)) === null || _a === void 0 ? void 0 : _a.playerId) === this.myPlayerId;
    }
    isTakenByOther(tokenId) {
        const owner = this.ownerOf(tokenId);
        if (!owner)
            return false;
        if (owner.playerId === this.myPlayerId)
            return false;
        // If that other player's slot is the one we just optimistically grabbed,
        // treat it as ours visually until the server resolves.
        if (this.localPickId === tokenId)
            return false;
        return true;
    }
    onTileClick(token) {
        if (this.isTakenByOther(token.id))
            return;
        if (this.isMine(token.id)) {
            this.localPickId = '';
            this.pick.emit(null);
        }
        else {
            this.localPickId = token.id;
            this.pick.emit(token.id);
        }
    }
}
TokenPickerComponent.ɵfac = function TokenPickerComponent_Factory(t) { return new (t || TokenPickerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_tokens_service__WEBPACK_IMPORTED_MODULE_0__.TokensService)); };
TokenPickerComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: TokenPickerComponent, selectors: [["app-token-picker"]], inputs: { myPlayerId: "myPlayerId", players: "players" }, outputs: { pick: "pick" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]], decls: 5, vars: 1, consts: [[1, "token-picker"], [1, "picker-title"], [1, "token-grid"], ["type", "button", "class", "token-tile", 3, "taken", "mine", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "token-tile", 3, "click"], ["size", "md", 3, "tokenId"], [1, "token-name"], ["class", "taken-by", 4, "ngIf"], [1, "taken-by"]], template: function TokenPickerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Pick your avatar");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, TokenPickerComponent_button_4_Template, 5, 9, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.tokensSvc.tokens);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _token_avatar_token_avatar_component__WEBPACK_IMPORTED_MODULE_1__.TokenAvatarComponent, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf], styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%] {\n  --ink: #1a1330;\n}\n.token-picker[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.picker-title[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-size: 1.15rem;\n  font-weight: 400;\n  color: var(--ink);\n  letter-spacing: 0.02em;\n}\n.token-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-gap: 12px 8px;\n  gap: 12px 8px;\n}\n.token-tile[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  border-radius: 8px;\n  padding: 4px 2px 6px;\n  text-align: center;\n  color: var(--ink);\n  font: inherit;\n  position: relative;\n  min-width: 0;\n  cursor: pointer;\n  transition: transform 80ms ease;\n  \n  animation: token-bob 2.6s ease-in-out infinite;\n}\n.token-tile[_ngcontent-%COMP%]:active {\n  transform: translateY(2px);\n}\n.token-tile.taken[_ngcontent-%COMP%] {\n  opacity: 0.35;\n  filter: grayscale(0.6);\n  pointer-events: none;\n}\n.token-tile.mine[_ngcontent-%COMP%]     .avatar {\n  outline-color: var(--accent-yellow);\n  box-shadow: 0 0 0 3px var(--ink), 0 5px 0 var(--ink);\n  animation: token-spring 520ms cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.token-tile[_ngcontent-%COMP%]     .avatar {\n  outline: 3px solid var(--ink);\n  outline-offset: -3px;\n  box-shadow: 0 4px 0 var(--ink);\n  border-radius: 50%;\n}\n\n.token-tile[_ngcontent-%COMP%]     .avatar.size-md {\n  width: 64px;\n  height: 64px;\n}\n@keyframes token-spring {\n  0% {\n    transform: scale(1);\n  }\n  25% {\n    transform: scale(1.22);\n  }\n  50% {\n    transform: scale(0.9);\n  }\n  70% {\n    transform: scale(1.08);\n  }\n  85% {\n    transform: scale(0.97);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n\n@keyframes token-bob {\n  0%, 100% {\n    translate: 0 0;\n  }\n  50% {\n    translate: 0 -4px;\n  }\n}\n.token-tile[_ngcontent-%COMP%]:nth-child(7n+1) {\n  animation-delay: 0ms;\n  animation-duration: 2.6s;\n}\n.token-tile[_ngcontent-%COMP%]:nth-child(7n+2) {\n  animation-delay: 220ms;\n  animation-duration: 2.15s;\n}\n.token-tile[_ngcontent-%COMP%]:nth-child(7n+3) {\n  animation-delay: 370ms;\n  animation-duration: 2.9s;\n}\n.token-tile[_ngcontent-%COMP%]:nth-child(7n+4) {\n  animation-delay: 110ms;\n  animation-duration: 2.35s;\n}\n.token-tile[_ngcontent-%COMP%]:nth-child(7n+5) {\n  animation-delay: 290ms;\n  animation-duration: 2.75s;\n}\n.token-tile[_ngcontent-%COMP%]:nth-child(7n+6) {\n  animation-delay: 60ms;\n  animation-duration: 2.5s;\n}\n.token-tile[_ngcontent-%COMP%]:nth-child(7n+7) {\n  animation-delay: 430ms;\n  animation-duration: 2.2s;\n}\n.token-name[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  font-family: \"Caveat\", cursive;\n  font-size: 1rem;\n  font-weight: 700;\n  line-height: 1.1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: var(--ink);\n}\n.taken-by[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -4px;\n  left: 0;\n  right: 0;\n  font-family: \"Caveat\", cursive;\n  font-size: 0.85rem;\n  font-weight: 700;\n  color: var(--ink);\n  opacity: 0.85;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRva2VuLXBpY2tlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7RUFBUSxjQUFBO0FBR1I7QUFEQTtFQUFnQixXQUFBO0FBS2hCO0FBSkE7RUFDRSxnQkFBQTtFQUNBLG1EQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7QUFPRjtBQUpBO0VBQ0UsYUFBQTtFQUNBLHFDQUFBO0VBQ0Esa0JBQUE7RUFBQSxhQUFBO0FBT0Y7QUFKQTtFQUNFLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSwrQkFBQTtFQUNBOzRFQUFBO0VBRUEsOENBQUE7QUFPRjtBQUxFO0VBQVcsMEJBQUE7QUFRYjtBQU5FO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esb0JBQUE7QUFRSjtBQU5FO0VBQ0UsbUNBQUE7RUFDQSxvREFBQTtFQUNBLCtEQUFBO0FBUUo7QUFKQSxpRkFBQTtBQUNBO0VBQ0UsNkJBQUE7RUFDQSxvQkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7QUFPRjtBQUxBLHdFQUFBO0FBQ0E7RUFBd0MsV0FBQTtFQUFhLFlBQUE7QUFVckQ7QUFSQTtFQUNFO0lBQU8sbUJBQUE7RUFZUDtFQVhBO0lBQU8sc0JBQUE7RUFjUDtFQWJBO0lBQU8scUJBQUE7RUFnQlA7RUFmQTtJQUFPLHNCQUFBO0VBa0JQO0VBakJBO0lBQU8sc0JBQUE7RUFvQlA7RUFuQkE7SUFBTyxtQkFBQTtFQXNCUDtBQUNGO0FBckJBLDBFQUFBO0FBQ0E7RUFDRTtJQUFXLGNBQUE7RUF3Qlg7RUF2QkE7SUFBVyxpQkFBQTtFQTBCWDtBQUNGO0FBekJBO0VBQThCLG9CQUFBO0VBQXlCLHdCQUFBO0FBNkJ2RDtBQTVCQTtFQUE4QixzQkFBQTtFQUF5Qix5QkFBQTtBQWlDdkQ7QUFoQ0E7RUFBOEIsc0JBQUE7RUFBeUIsd0JBQUE7QUFxQ3ZEO0FBcENBO0VBQThCLHNCQUFBO0VBQXlCLHlCQUFBO0FBeUN2RDtBQXhDQTtFQUE4QixzQkFBQTtFQUF5Qix5QkFBQTtBQTZDdkQ7QUE1Q0E7RUFBOEIscUJBQUE7RUFBeUIsd0JBQUE7QUFpRHZEO0FBaERBO0VBQThCLHNCQUFBO0VBQXlCLHdCQUFBO0FBcUR2RDtBQW5EQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7QUFzREY7QUFwREE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtBQXVERiIsImZpbGUiOiJ0b2tlbi1waWNrZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7IC0taW5rOiAjMWExMzMwOyB9XG5cbi50b2tlbi1waWNrZXIgeyB3aWR0aDogMTAwJTsgfVxuLnBpY2tlci10aXRsZSB7XG4gIG1hcmdpbjogMCAwIDEwcHg7XG4gIGZvbnQtZmFtaWx5OiAnUGVybWFuZW50IE1hcmtlcicsICdCZWxlcmVuJywgY3Vyc2l2ZTtcbiAgZm9udC1zaXplOiAxLjE1cmVtO1xuICBmb250LXdlaWdodDogNDAwO1xuICBjb2xvcjogdmFyKC0taW5rKTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDJlbTtcbn1cblxuLnRva2VuLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xuICBnYXA6IDEycHggOHB4O1xufVxuXG4udG9rZW4tdGlsZSB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcGFkZGluZzogNHB4IDJweCA2cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6IHZhcigtLWluayk7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWluLXdpZHRoOiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSA4MG1zIGVhc2U7XG4gIC8qIEdlbnRsZSBpZGxlIGJvYiDigJQgZmVlbHMgYWxpdmUgd2hpbGUgdGhlIGhvc3QgaXMgZGl0aGVyaW5nLiBQZXItdGlsZVxuICAgICBkdXJhdGlvbiArIGRlbGF5IGJlbG93IHNjcmFtYmxlcyB0aGUgcGhhc2Ugc28gdGhleSBkb24ndCBhbGwgc3luYyB1cC4gKi9cbiAgYW5pbWF0aW9uOiB0b2tlbi1ib2IgMi42cyBlYXNlLWluLW91dCBpbmZpbml0ZTtcblxuICAmOmFjdGl2ZSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgycHgpOyB9XG5cbiAgJi50YWtlbiB7XG4gICAgb3BhY2l0eTogMC4zNTtcbiAgICBmaWx0ZXI6IGdyYXlzY2FsZSgwLjYpO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG4gICYubWluZSA6Om5nLWRlZXAgLmF2YXRhciB7XG4gICAgb3V0bGluZS1jb2xvcjogdmFyKC0tYWNjZW50LXllbGxvdyk7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHZhcigtLWluayksIDAgNXB4IDAgdmFyKC0taW5rKTtcbiAgICBhbmltYXRpb246IHRva2VuLXNwcmluZyA1MjBtcyBjdWJpYy1iZXppZXIoMC4zNCwgMS41NiwgMC42NCwgMSk7XG4gIH1cbn1cblxuLyogVGhpY2sgYmxhY2sgb3V0bGluZSArIGNodW5reSBzaGFkb3cgb24gZXZlcnkgYXZhdGFyIHNvIHRoZXkgcmVhZCBhcyBzdGlja2VycyAqL1xuLnRva2VuLXRpbGUgOjpuZy1kZWVwIC5hdmF0YXIge1xuICBvdXRsaW5lOiAzcHggc29saWQgdmFyKC0taW5rKTtcbiAgb3V0bGluZS1vZmZzZXQ6IC0zcHg7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDAgdmFyKC0taW5rKTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuLyogQnVtcCB0aGUgcGlja2VyIGF2YXRhcnMgdXAgZnJvbSB0aGUgYXZhdGFyIGNvbXBvbmVudCdzIGRlZmF1bHQgNDhweCAqL1xuLnRva2VuLXRpbGUgOjpuZy1kZWVwIC5hdmF0YXIuc2l6ZS1tZCB7IHdpZHRoOiA2NHB4OyBoZWlnaHQ6IDY0cHg7IH1cblxuQGtleWZyYW1lcyB0b2tlbi1zcHJpbmcge1xuICAwJSAgIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfVxuICAyNSUgIHsgdHJhbnNmb3JtOiBzY2FsZSgxLjIyKTsgfVxuICA1MCUgIHsgdHJhbnNmb3JtOiBzY2FsZSgwLjkpOyB9XG4gIDcwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpOyB9XG4gIDg1JSAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuOTcpOyB9XG4gIDEwMCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9XG59XG4vKiBTdWJ0bGUgNHB4IGJvYiwgcGFpcmVkIHdpdGggcGVyLXRpbGUgZHVyYXRpb24vZGVsYXkgYmVsb3cgZm9yIHZhcmlldHkgKi9cbkBrZXlmcmFtZXMgdG9rZW4tYm9iIHtcbiAgMCUsIDEwMCUgeyB0cmFuc2xhdGU6IDAgMDsgfVxuICA1MCUgICAgICB7IHRyYW5zbGF0ZTogMCAtNHB4OyB9XG59XG4udG9rZW4tdGlsZTpudGgtY2hpbGQoN24rMSkgeyBhbmltYXRpb24tZGVsYXk6ICAgIDBtczsgYW5pbWF0aW9uLWR1cmF0aW9uOiAyLjZzOyAgfVxuLnRva2VuLXRpbGU6bnRoLWNoaWxkKDduKzIpIHsgYW5pbWF0aW9uLWRlbGF5OiAgMjIwbXM7IGFuaW1hdGlvbi1kdXJhdGlvbjogMi4xNXM7IH1cbi50b2tlbi10aWxlOm50aC1jaGlsZCg3biszKSB7IGFuaW1hdGlvbi1kZWxheTogIDM3MG1zOyBhbmltYXRpb24tZHVyYXRpb246IDIuOXM7ICB9XG4udG9rZW4tdGlsZTpudGgtY2hpbGQoN24rNCkgeyBhbmltYXRpb24tZGVsYXk6ICAxMTBtczsgYW5pbWF0aW9uLWR1cmF0aW9uOiAyLjM1czsgfVxuLnRva2VuLXRpbGU6bnRoLWNoaWxkKDduKzUpIHsgYW5pbWF0aW9uLWRlbGF5OiAgMjkwbXM7IGFuaW1hdGlvbi1kdXJhdGlvbjogMi43NXM7IH1cbi50b2tlbi10aWxlOm50aC1jaGlsZCg3bis2KSB7IGFuaW1hdGlvbi1kZWxheTogICA2MG1zOyBhbmltYXRpb24tZHVyYXRpb246IDIuNXM7ICB9XG4udG9rZW4tdGlsZTpudGgtY2hpbGQoN24rNykgeyBhbmltYXRpb24tZGVsYXk6ICA0MzBtczsgYW5pbWF0aW9uLWR1cmF0aW9uOiAyLjJzOyAgfVxuXG4udG9rZW4tbmFtZSB7XG4gIG1hcmdpbi10b3A6IDZweDtcbiAgZm9udC1mYW1pbHk6ICdDYXZlYXQnLCBjdXJzaXZlO1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjE7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBjb2xvcjogdmFyKC0taW5rKTtcbn1cbi50YWtlbi1ieSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAtNHB4O1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgZm9udC1mYW1pbHk6ICdDYXZlYXQnLCBjdXJzaXZlO1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiB2YXIoLS1pbmspO1xuICBvcGFjaXR5OiAwLjg1O1xufVxuIl19 */"] });


/***/ }),

/***/ 7327:
/*!***************************************************************!*\
  !*** ./src/app/components/word-cloud/word-cloud.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WordCloudComponent": () => (/* binding */ WordCloudComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var angular_d3_cloud__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-d3-cloud */ 130);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6362);



function WordCloudComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2)(1, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("left", ctx_r0.tooltip.x, "px")("top", ctx_r0.tooltip.y, "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.tooltip.text);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("said ", ctx_r0.tooltip.count, " ", ctx_r0.tooltip.count === 1 ? "time" : "times", "");
} }
class WordCloudComponent {
    constructor() {
        this.data = [];
        this.heightOffset = 0;
        this.width = window.innerWidth;
        this.height = window.innerHeight - this.heightOffset;
        this.tooltip = null;
    }
    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight - this.heightOffset;
    }
    ngOnChanges() {
        this.height = window.innerHeight - this.heightOffset;
    }
    onWordOver(e) {
        var _a, _b;
        const text = String((_a = e.word.text) !== null && _a !== void 0 ? _a : '');
        const count = Number((_b = e.word.count) !== null && _b !== void 0 ? _b : 0);
        if (!text || !count)
            return;
        this.tooltip = { x: e.event.clientX, y: e.event.clientY, text, count };
    }
    onWordOut() {
        this.tooltip = null;
    }
}
WordCloudComponent.ɵfac = function WordCloudComponent_Factory(t) { return new (t || WordCloudComponent)(); };
WordCloudComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WordCloudComponent, selectors: [["app-word-cloud"]], hostBindings: function WordCloudComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resize", function WordCloudComponent_resize_HostBindingHandler() { return ctx.onResize(); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
    } }, inputs: { data: "data", heightOffset: "heightOffset" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 2, vars: 7, consts: [["font", "serif", 3, "data", "width", "height", "padding", "rotate", "autoFill", "wordMouseOver", "wordMouseOut"], ["class", "cloud-tooltip", 3, "left", "top", 4, "ngIf"], [1, "cloud-tooltip"], [1, "t-word"], [1, "t-count"]], template: function WordCloudComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "angular-d3-cloud", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("wordMouseOver", function WordCloudComponent_Template_angular_d3_cloud_wordMouseOver_0_listener($event) { return ctx.onWordOver($event); })("wordMouseOut", function WordCloudComponent_Template_angular_d3_cloud_wordMouseOut_0_listener() { return ctx.onWordOut(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WordCloudComponent_div_1_Template, 5, 7, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx.data)("width", ctx.width)("height", ctx.height)("padding", 3)("rotate", 0)("autoFill", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tooltip);
    } }, directives: [angular_d3_cloud__WEBPACK_IMPORTED_MODULE_1__.AngularD3CloudComponent, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf], styles: ["[_nghost-%COMP%] {\n  display: block;\n  position: relative;\n}\n\n.cloud-tooltip[_ngcontent-%COMP%] {\n  position: fixed;\n  transform: translate(-50%, calc(-100% - 14px));\n  pointer-events: none;\n  z-index: 50;\n  padding: 0.45rem 0.75rem;\n  border-radius: 8px;\n  background: rgba(14, 16, 39, 0.95);\n  border: 1px solid var(--accent-yellow);\n  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);\n  color: #fff;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.1rem;\n  white-space: nowrap;\n  font-size: 0.85rem;\n  letter-spacing: 0.03em;\n}\n\n.cloud-tooltip[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  bottom: -6px;\n  left: 50%;\n  transform: translateX(-50%) rotate(45deg);\n  width: 10px;\n  height: 10px;\n  background: rgba(14, 16, 39, 0.95);\n  border-right: 1px solid var(--accent-yellow);\n  border-bottom: 1px solid var(--accent-yellow);\n}\n\n.t-word[_ngcontent-%COMP%] {\n  color: var(--accent-yellow);\n  font-weight: 600;\n}\n\n.t-count[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmQtY2xvdWQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBUSxjQUFBO0VBQWdCLGtCQUFBO0FBR3hCOztBQURBO0VBQ0UsZUFBQTtFQUNBLDhDQUFBO0VBQ0Esb0JBQUE7RUFDQSxXQUFBO0VBQ0Esd0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esc0NBQUE7RUFDQSx5Q0FBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7QUFJRjs7QUFGRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxTQUFBO0VBQ0EseUNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtDQUFBO0VBQ0EsNENBQUE7RUFDQSw2Q0FBQTtBQUlKOztBQUFBO0VBQ0UsMkJBQUE7RUFDQSxnQkFBQTtBQUdGOztBQUFBO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7QUFHRiIsImZpbGUiOiJ3b3JkLWNsb3VkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3QgeyBkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IHJlbGF0aXZlOyB9XG5cbi5jbG91ZC10b29sdGlwIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCBjYWxjKC0xMDAlIC0gMTRweCkpO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgei1pbmRleDogNTA7XG4gIHBhZGRpbmc6IDAuNDVyZW0gMC43NXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDE0LCAxNiwgMzksIDAuOTUpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1hY2NlbnQteWVsbG93KTtcbiAgYm94LXNoYWRvdzogMCA2cHggMjRweCByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIGNvbG9yOiAjZmZmO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuMXJlbTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAtNnB4O1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKDQ1ZGVnKTtcbiAgICB3aWR0aDogMTBweDtcbiAgICBoZWlnaHQ6IDEwcHg7XG4gICAgYmFja2dyb3VuZDogcmdiYSgxNCwgMTYsIDM5LCAwLjk1KTtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1hY2NlbnQteWVsbG93KTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYWNjZW50LXllbGxvdyk7XG4gIH1cbn1cblxuLnQtd29yZCB7XG4gIGNvbG9yOiB2YXIoLS1hY2NlbnQteWVsbG93KTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnQtY291bnQge1xuICBjb2xvcjogdmFyKC0tdGV4dC1kaW0pO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA4ZW07XG59XG4iXX0= */"] });


/***/ }),

/***/ 9698:
/*!***************************!*\
  !*** ./src/app/config.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WS_URL": () => (/* binding */ WS_URL)
/* harmony export */ });
const WS_URL = 'wss://xybej7pfk0.execute-api.us-east-1.amazonaws.com/production';


/***/ }),

/***/ 766:
/*!************************************************!*\
  !*** ./src/app/pages/cloud/cloud.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CloudComponent": () => (/* binding */ CloudComponent)
/* harmony export */ });
/* harmony import */ var A_Coding_sussy_bingo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 4363);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _components_word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/word-cloud/word-cloud.component */ 7327);








function CloudComponent_p_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r0.data.length, " words said more than once ");
  }
}

class CloudComponent {
  constructor(http) {
    this.http = http;
    this.data = [];
    this.noNoWords = new Set(['i', "i'm", 'im', 'to', 'you', 'the', 'my', 'a', 'this', 'just', 'that', 'is', 'of', 'in', 'and', 'it', 'on', 'have', 'going', 'dont', 'its', 'so', 'was', 'be', 'for', 'but', 'at', 'if', 'me', 'we', 'are', 'as', 'do', 'or', 'no', 'not', 'your', 'they', 'them', 'he', 'she', 'his', 'her', 'what', 'when', 'where', 'why', 'how', 'can', 'will', 'would', 'could', 'should', 'had', 'has', 'were', 'been', 'with', 'from', 'about', 'out', 'up', 'down', 'an', 'by', 'get', 'got', 'all', 'any', 'some', 'one', 'two', 'there', 'here', 'like', 'know', 'think', 'really', 'yeah', 'oh', 'ok', 'okay', 'well', 'its', 'thats', 'dont', 'cant', 'wont', 'ill', 'youre']);
  }

  ngOnInit() {
    var _this = this;

    return (0,A_Coding_sussy_bingo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _a;

      const text = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.firstValueFrom)(_this.http.get('assets/ingest_file.txt', {
        responseType: 'text'
      }));
      const counts = {};

      for (const match of text.matchAll(/[“"]([^"“”\n]+)[”"]\s?-/g)) {
        for (const word of match[1].split(/\s+/).map(w => w.toLocaleLowerCase().replace(/[^a-z']/g, '').replace(/^'+|'+$/g, '')).filter(w => w && !_this.noNoWords.has(w))) {
          counts[word] = ((_a = counts[word]) !== null && _a !== void 0 ? _a : 0) + 1;
        }
      }

      _this.data = Object.entries(counts).filter(([, n]) => n > 1).map(([text, n]) => ({
        text,
        value: 12 + n * 8,
        count: n
      }));
    })();
  }

}

CloudComponent.ɵfac = function CloudComponent_Factory(t) {
  return new (t || CloudComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient));
};

CloudComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: CloudComponent,
  selectors: [["app-cloud"]],
  decls: 12,
  vars: 3,
  consts: [[1, "cloud-page"], [1, "bg-glow"], [1, "cloud-header"], ["routerLink", "/", 1, "sb-button", "secondary", "back"], [1, "title-block"], [1, "title"], ["class", "tagline", 4, "ngIf"], [1, "spacer"], [1, "cloud-stage"], [3, "data", "heightOffset"], [1, "tagline"]],
  template: function CloudComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "header", 2)(3, "a", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "\u2190 Home");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4)(6, "h1", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "The Quote Cloud");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, CloudComponent_p_8_Template, 2, 1, "p", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "app-word-cloud", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.data.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", ctx.data)("heightOffset", 120);
    }
  },
  directives: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _components_word_cloud_word_cloud_component__WEBPACK_IMPORTED_MODULE_1__.WordCloudComponent],
  styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.cloud-page[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  background: radial-gradient(ellipse at top left, rgba(177, 138, 255, 0.18), transparent 55%), radial-gradient(ellipse at bottom right, rgba(76, 201, 240, 0.18), transparent 55%), radial-gradient(ellipse at center, rgba(239, 71, 111, 0.1), transparent 70%), var(--bg-deep);\n}\n\n.bg-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.025) 0, rgba(255, 255, 255, 0.025) 2px, transparent 2px, transparent 22px);\n  pointer-events: none;\n  z-index: 1;\n}\n\n.cloud-header[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1.5rem;\n  z-index: 3;\n  pointer-events: none;\n}\n\n.cloud-header[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  pointer-events: auto;\n}\n\n.back[_ngcontent-%COMP%] {\n  text-decoration: none;\n  font-size: 0.95rem;\n  padding: 0.55rem 1rem;\n}\n\n.title-block[_ngcontent-%COMP%] {\n  text-align: center;\n  flex: 1;\n}\n\n.title[_ngcontent-%COMP%] {\n  font-family: \"Beleren\", \"Roboto\", serif;\n  font-size: clamp(1.6rem, 3.5vw, 2.6rem);\n  font-weight: 400;\n  letter-spacing: 0.06em;\n  line-height: 1.2;\n  margin: 0;\n  padding: 0.1em 0.05em;\n  display: inline-block;\n  background: linear-gradient(135deg, #ffd166 0%, #ef476f 50%, #b18aff 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  filter: drop-shadow(0 4px 16px rgba(255, 209, 102, 0.3));\n}\n\n.tagline[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--text-dim);\n  margin: 0.2rem 0 0;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.spacer[_ngcontent-%COMP%] {\n  display: inline-block;\n  min-width: 5.5rem;\n}\n\n.cloud-stage[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 120px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\napp-word-cloud[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n  .cloud-stage angular-d3-cloud text {\n  filter: drop-shadow(0 0 12px rgba(0, 0, 0, 0.45));\n  cursor: default;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsb3VkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQVEsY0FBQTtBQUVSOztBQUFBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsK1FBQ0U7QUFFSjs7QUFJQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLG1KQUNFO0VBT0Ysb0JBQUE7RUFDQSxVQUFBO0FBUkY7O0FBV0E7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtFQUNBLG9CQUFBO0VBQ0EsVUFBQTtFQUNBLG9CQUFBO0FBUkY7O0FBV0E7RUFBb0Isb0JBQUE7QUFQcEI7O0FBU0E7RUFDRSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7QUFORjs7QUFTQTtFQUNFLGtCQUFBO0VBQ0EsT0FBQTtBQU5GOztBQVNBO0VBQ0UsdUNBQUE7RUFDQSx1Q0FBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0VBQ0EsMEVBQUE7RUFDQSw2QkFBQTtFQUNBLHFCQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtFQUNBLHdEQUFBO0FBTkY7O0FBU0E7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0FBTkY7O0FBU0E7RUFFRSxxQkFBQTtFQUNBLGlCQUFBO0FBUEY7O0FBVUE7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFQRjs7QUFVQTtFQUNFLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQVBGOztBQVVBO0VBQ0UsaURBQUE7RUFDQSxlQUFBO0FBUEYiLCJmaWxlIjoiY2xvdWQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7IGRpc3BsYXk6IGJsb2NrOyB9XG5cbi5jbG91ZC1wYWdlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6XG4gICAgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgdG9wIGxlZnQsIHJnYmEoMTc3LCAxMzgsIDI1NSwgMC4xOCksIHRyYW5zcGFyZW50IDU1JSksXG4gICAgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgYm90dG9tIHJpZ2h0LCByZ2JhKDc2LCAyMDEsIDI0MCwgMC4xOCksIHRyYW5zcGFyZW50IDU1JSksXG4gICAgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgY2VudGVyLCByZ2JhKDIzOSwgNzEsIDExMSwgMC4xMCksIHRyYW5zcGFyZW50IDcwJSksXG4gICAgdmFyKC0tYmctZGVlcCk7XG59XG5cbi5iZy1nbG93IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBpbnNldDogMDtcbiAgYmFja2dyb3VuZC1pbWFnZTpcbiAgICByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KFxuICAgICAgNDVkZWcsXG4gICAgICByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDI1KSAwLFxuICAgICAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyNSkgMnB4LFxuICAgICAgdHJhbnNwYXJlbnQgMnB4LFxuICAgICAgdHJhbnNwYXJlbnQgMjJweFxuICAgICk7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuXG4uY2xvdWQtaGVhZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMXJlbTtcbiAgcGFkZGluZzogMXJlbSAxLjVyZW07XG4gIHotaW5kZXg6IDM7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4uY2xvdWQtaGVhZGVyID4gKiB7IHBvaW50ZXItZXZlbnRzOiBhdXRvOyB9XG5cbi5iYWNrIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIHBhZGRpbmc6IDAuNTVyZW0gMXJlbTtcbn1cblxuLnRpdGxlLWJsb2NrIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmbGV4OiAxO1xufVxuXG4udGl0bGUge1xuICBmb250LWZhbWlseTogJ0JlbGVyZW4nLCAnUm9ib3RvJywgc2VyaWY7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS42cmVtLCAzLjV2dywgMi42cmVtKTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDZlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwLjFlbSAwLjA1ZW07XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmZDE2NiAwJSwgI2VmNDc2ZiA1MCUsICNiMThhZmYgMTAwJSk7XG4gIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xuICBiYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6IHRyYW5zcGFyZW50O1xuICBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgNHB4IDE2cHggcmdiYSgyNTUsIDIwOSwgMTAyLCAwLjMpKTtcbn1cblxuLnRhZ2xpbmUge1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGNvbG9yOiB2YXIoLS10ZXh0LWRpbSk7XG4gIG1hcmdpbjogMC4ycmVtIDAgMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDZlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLnNwYWNlciB7XG4gIC8vIG1pcnJvcnMgdGhlIGJhY2sgYnV0dG9uIHdpZHRoIHNvIHRoZSB0aXRsZSBzdGF5cyBjZW50ZXJlZFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1pbi13aWR0aDogNS41cmVtO1xufVxuXG4uY2xvdWQtc3RhZ2Uge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTIwcHg7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIHotaW5kZXg6IDI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5hcHAtd29yZC1jbG91ZCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG46Om5nLWRlZXAgLmNsb3VkLXN0YWdlIGFuZ3VsYXItZDMtY2xvdWQgdGV4dCB7XG4gIGZpbHRlcjogZHJvcC1zaGFkb3coMCAwIDEycHggcmdiYSgwLCAwLCAwLCAwLjQ1KSk7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cbiJdfQ== */"]
});

/***/ }),

/***/ 538:
/*!**********************************************!*\
  !*** ./src/app/pages/host/host.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HostComponent": () => (/* binding */ HostComponent)
/* harmony export */ });
/* harmony import */ var A_Coding_sussy_bingo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/animations */ 1631);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 6078);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config */ 9698);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_web_socket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/web-socket.service */ 4509);
/* harmony import */ var _services_game_state_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/game-state.service */ 382);
/* harmony import */ var _services_quote_ingest_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/quote-ingest.service */ 6372);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _components_token_avatar_token_avatar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/token-avatar/token-avatar.component */ 8462);












function HostComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 10)(1, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_div_10_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r6.newCard();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "\u21BB New Card");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_div_10_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r8.endGameRequest();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "\u23F9 End Game");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}

function HostComponent_main_11_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "h2", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Connecting to the room\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "If this hangs, check the browser console for WebSocket errors.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
}

function HostComponent_main_11_ng_container_3_li_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "app-token-avatar", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const p_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tokenId", p_r17.tokenId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](p_r17.name);
  }
}

function HostComponent_main_11_ng_container_3_li_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Open ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "/play");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, " on your phone to join\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

function HostComponent_main_11_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 22)(2, "h2", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Waiting for players");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "ul", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, HostComponent_main_11_ng_container_3_li_7_Template, 4, 2, "li", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, HostComponent_main_11_ng_container_3_li_8_Template, 5, 0, "li", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 26)(10, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_main_11_ng_container_3_Template_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return ctx_r18.startCard();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " \u25B6 Start Game ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_main_11_ng_container_3_Template_button_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return ctx_r20.clearLobbyRequest();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, " Clear lobby ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", ctx_r10.state.players.length, " ", ctx_r10.state.players.length === 1 ? "player has" : "players have", " joined");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r10.state.players)("ngForTrackBy", ctx_r10.trackPlayerId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r10.state.players.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", !ctx_r10.state.players.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", !ctx_r10.state.players.length);
  }
}

function HostComponent_main_11_ng_container_4_ng_container_1_div_7_ul_6_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "app-token-avatar", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const g_r32 = ctx.$implicit;
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("correct", g_r32.correct);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tokenId", ctx_r31.tokenIdFor(g_r32.playerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](g_r32.name);
  }
}

function HostComponent_main_11_ng_container_4_ng_container_1_div_7_ul_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ul", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HostComponent_main_11_ng_container_4_ng_container_1_div_7_ul_6_li_1_Template, 4, 4, "li", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const a_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r30.guessersFor(a_r29));
  }
}

function HostComponent_main_11_ng_container_4_ng_container_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 45)(1, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "percent");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, HostComponent_main_11_ng_container_4_ng_container_1_div_7_ul_6_Template, 2, 1, "ul", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const a_r29 = ctx.$implicit;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("truth", ctx_r28.isRevealed && ctx_r28.state.lastReveal.truth === a_r29)("wrong", ctx_r28.isRevealed && ctx_r28.state.lastReveal.truth !== a_r29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](3, 7, ctx_r28.chanceFor(a_r29), "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](a_r29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r28.isRevealed && ctx_r28.guessersFor(a_r29).length);
  }
}

function HostComponent_main_11_ng_container_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 40)(2, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "blockquote", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, HostComponent_main_11_ng_container_4_ng_container_1_div_7_Template, 7, 10, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("@quoteIn", ctx_r21.state.currentQuote.index);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Quote #", ctx_r21.state.currentQuote.index, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r21.state.currentQuote.quote);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("is-revealed", ctx_r21.isRevealed);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r21.state.currentQuote.possibleAnswers)("ngForTrackBy", ctx_r21.trackAnswerCard);
  }
}

function HostComponent_main_11_ng_container_4_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 53)(1, "h2", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Ready to roll");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Hit Next Quote when everyone's settled in.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "ol", 54)(6, "li")(7, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "A quote shows up with ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, "four suspects");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, ". Who said it?");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "li")(15, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "span")(18, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, "Tap that name");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, " on your bingo card to drop your token.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "li")(22, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23, "3");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](25, "Right answer? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](27, "Cell locks green");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](28, ". Wrong? Your token lifts off \u2014 no penalty, try again next round.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "li")(30, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](31, "4");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](33, "First to ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35, "5 locked cells in a row");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](36, " wins! (horizontal, vertical, or diagonal \u2014 like real bingo)");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
}

function HostComponent_main_11_ng_container_4_div_4_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " got 5 in a row! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r34.state.bingoWinners[0].name);
  }
}

function HostComponent_main_11_ng_container_4_div_4_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " tied with 5 in a row! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", ctx_r35.state.bingoWinners.length, " players");
  }
}

function HostComponent_main_11_ng_container_4_div_4_li_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "app-token-avatar", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const w_r37 = ctx.$implicit;
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tokenId", ctx_r36.tokenIdFor(w_r37.playerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](w_r37.name);
  }
}

function HostComponent_main_11_ng_container_4_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 56)(1, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "BINGO!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, HostComponent_main_11_ng_container_4_div_4_ng_container_4_Template, 4, 1, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, HostComponent_main_11_ng_container_4_div_4_ng_container_5_Template, 4, 1, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "ul", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, HostComponent_main_11_ng_container_4_div_4_li_7_Template, 4, 2, "li", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "p", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Hit ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "End Game");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, " to head back to the lobby.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r24.state.bingoWinners.length === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r24.state.bingoWinners.length > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r24.state.bingoWinners);
  }
}

function HostComponent_main_11_ng_container_4_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_main_11_ng_container_4_button_6_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r39);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return ctx_r38.nextQuote();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " \u23ED Next Quote ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

function HostComponent_main_11_ng_container_4_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_main_11_ng_container_4_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r41);
      const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return ctx_r40.reveal();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " \uD83D\uDC41 Reveal Answer ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

function HostComponent_main_11_ng_container_4_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_main_11_ng_container_4_button_8_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r43);
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return ctx_r42.endGameRequest();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " \u23F9 End Game ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

function HostComponent_main_11_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HostComponent_main_11_ng_container_4_ng_container_1_Template, 8, 7, "ng-container", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HostComponent_main_11_ng_container_4_ng_template_2_Template, 37, 0, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, HostComponent_main_11_ng_container_4_div_4_Template, 13, 3, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, HostComponent_main_11_ng_container_4_button_6_Template, 2, 0, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, HostComponent_main_11_ng_container_4_button_7_Template, 2, 0, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, HostComponent_main_11_ng_container_4_button_8_Template, 2, 0, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](3);

    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r11.state.currentQuote)("ngIfElse", _r22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r11.gameDecided);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r11.canAdvance);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r11.canReveal);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r11.gameDecided);
  }
}

function HostComponent_main_11_aside_5_li_4_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "+1");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

function HostComponent_main_11_aside_5_li_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 70)(1, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "app-token-avatar", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "span", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, HostComponent_main_11_aside_5_li_4_span_7_Template, 2, 0, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "span", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }

  if (rf & 2) {
    const row_r46 = ctx.$implicit;
    const i_r47 = ctx.index;
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("first", i_r47 === 0 && row_r46.score > 0)("second", i_r47 === 1 && row_r46.score > 0)("third", i_r47 === 2 && row_r46.score > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r46.score > 0 ? i_r47 === 0 ? "\uD83C\uDFC6" : i_r47 === 1 ? "\uD83E\uDD48" : i_r47 === 2 ? "\uD83E\uDD49" : i_r47 + 1 : i_r47 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tokenId", ctx_r44.tokenIdFor(row_r46.playerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r46.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r44.recentlyScored.has(row_r46.playerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r46.score);
  }
}

function HostComponent_main_11_aside_5_li_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "No scores yet");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

function HostComponent_main_11_aside_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "aside", 66)(1, "h3", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Leaderboard");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "ol", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, HostComponent_main_11_aside_5_li_4_Template, 10, 11, "li", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, HostComponent_main_11_aside_5_li_5_Template, 2, 0, "li", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r12.displayLeaderboard)("ngForTrackBy", ctx_r12.trackPlayerId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r12.displayLeaderboard.length);
  }
}

function HostComponent_main_11_ng_template_6_li_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 70)(1, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span", 73)(6, "span", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }

  if (rf & 2) {
    const row_r51 = ctx.$implicit;
    const i_r52 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("first", i_r52 === 0)("second", i_r52 === 1)("third", i_r52 === 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](i_r52 === 0 ? "\uD83D\uDC51" : i_r52 === 1 ? "\uD83E\uDD48" : i_r52 === 2 ? "\uD83E\uDD49" : i_r52 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r51.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r51.weight);
  }
}

function HostComponent_main_11_ng_template_6_li_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Loading quote pool\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

function HostComponent_main_11_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "aside", 77)(1, "h3", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Most Quoted");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "p", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "All-time quote counts from the channel.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "ol", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, HostComponent_main_11_ng_template_6_li_6_Template, 8, 9, "li", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, HostComponent_main_11_ng_template_6_li_7_Template, 2, 0, "li", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r14.topQuoters);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r14.topQuoters.length);
  }
}

function HostComponent_main_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "main", 13)(1, "section", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HostComponent_main_11_ng_container_2_Template, 7, 0, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, HostComponent_main_11_ng_container_3_Template, 14, 7, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, HostComponent_main_11_ng_container_4_Template, 9, 6, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, HostComponent_main_11_aside_5_Template, 6, 3, "aside", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, HostComponent_main_11_ng_template_6_Template, 8, 2, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](7);

    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.state.phase === "unknown");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.state.phase === "lobby");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.state.phase === "live");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.state.phase === "live")("ngIfElse", _r13);
  }
}

function HostComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_div_12_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r54);
      const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r53.endGameCancel();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_div_12_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "h2", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "End the game?");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Players go back to the lobby and scores reset.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 82)(7, "button", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_div_12_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r54);
      const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r56.endGameCancel();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "button", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_div_12_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r54);
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r57.endGameConfirm();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "End Game");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
}

function HostComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_div_13_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r59);
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r58.clearLobbyCancel();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_div_13_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "h2", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Clear the lobby?");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Every player is removed and sent back to the name screen.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 82)(7, "button", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_div_13_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r59);
      const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r61.clearLobbyCancel();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "button", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HostComponent_div_13_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r59);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r62.clearLobbyConfirm();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "Clear Lobby");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
}

function HostComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Loading quote pool\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}

class HostComponent {
  constructor(ws, game, ingest) {
    this.ws = ws;
    this.game = game;
    this.ingest = ingest;
    this.quotes = [];
    this.quotesUsed = new Set();
    this.weights = [];
    this.nameRoster = [];
    this.currentTruth = null;
    this.sub = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subscription();
    this.ingestReady = false;
    this.endGameConfirming = false;
    /** Player IDs that scored on the most recent reveal (for +1 badges). */

    this.recentlyScored = new Set();
    this.lastSeenRevealIndex = null;
    this.clearLobbyConfirming = false;
    /** Track answer cards by their grid position, not name. This keeps the DOM nodes
     *  pinned to their cells across quotes — names just text-swap in place. Tracking by
     *  name caused cards whose name carried over to be physically moved by ngFor, which
     *  the CSS grid does not animate, producing the "hang then snap" jump. */

    this.trackAnswerCard = (i, _name) => i;

    this.state = game.snapshot();
  }

  ngOnInit() {
    var _this = this;

    return (0,A_Coding_sussy_bingo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const result = yield _this.ingest.load();
      _this.quotes = result.quotes;
      _this.weights = result.weights;
      _this.nameRoster = result.weights.map(w => w.name);
      _this.ingestReady = true;

      _this.ws.connect(_config__WEBPACK_IMPORTED_MODULE_1__.WS_URL);

      _this.ws.onReconnect = () => _this.ws.send({
        type: 'host_hello'
      });

      _this.sub.add(_this.ws.messages$.subscribe(msg => _this.game.apply(msg)));

      _this.sub.add(_this.game.state$.subscribe(s => _this.onState(s)));

      _this.ws.send({
        type: 'host_hello'
      });
    })();
  }

  onState(s) {
    this.state = s; // When a new reveal arrives, capture which players scored on it

    if (s.lastReveal && s.lastReveal.index !== this.lastSeenRevealIndex) {
      this.lastSeenRevealIndex = s.lastReveal.index;
      this.recentlyScored = new Set(s.lastReveal.perPlayer.filter(p => p.correct).map(p => p.playerId));
      if (this.deltaTimer) clearTimeout(this.deltaTimer);
      this.deltaTimer = setTimeout(() => {
        this.recentlyScored = new Set();
      }, 4500);
    }
  }
  /** Leaderboard with stale duplicate entries collapsed to the best score per name. */


  get displayLeaderboard() {
    const byName = new Map();

    for (const row of this.state.leaderboard) {
      const existing = byName.get(row.name);
      if (!existing || row.score > existing.score) byName.set(row.name, row);
    }

    return [...byName.values()].sort((a, b) => b.score - a.score);
  }
  /** Per-answer breakdown for the current revealed round. */


  guessersFor(answer) {
    var _a;

    const reveal = this.state.lastReveal;
    if (!reveal || reveal.index !== ((_a = this.state.currentQuote) === null || _a === void 0 ? void 0 : _a.index)) return [];
    return reveal.perPlayer.filter(p => p.guess === answer).map(p => ({
      playerId: p.playerId,
      name: p.name,
      correct: p.correct
    }));
  }
  /**
   * Prior probability that `answer` is the speaker, given the four candidates
   * on the current quote. Computed from the ingest file's per-person quote
   * counts: weight_i / sum_of_candidate_weights.
   */


  chanceFor(answer) {
    if (!this.state.currentQuote) return 0;

    const weightOf = n => {
      var _a, _b;

      return (_b = (_a = this.weights.find(w => w.name === n)) === null || _a === void 0 ? void 0 : _a.weight) !== null && _b !== void 0 ? _b : 0;
    };

    const total = this.state.currentQuote.possibleAnswers.reduce((sum, c) => sum + weightOf(c), 0);
    if (total === 0) return 0;
    return weightOf(answer) / total;
  }

  get isRevealed() {
    var _a;

    return !!this.state.lastReveal && this.state.lastReveal.index === ((_a = this.state.currentQuote) === null || _a === void 0 ? void 0 : _a.index);
  }

  get canReveal() {
    return !!this.state.currentQuote && !this.isRevealed && !!this.currentTruth;
  }

  get canAdvance() {
    return !this.gameDecided && (!this.state.currentQuote || this.isRevealed);
  }
  /** True once a bingo has been called — game frozen until host ends/restarts. */


  get gameDecided() {
    var _a;

    return !!((_a = this.state.bingoWinners) === null || _a === void 0 ? void 0 : _a.length);
  }
  /** Top N quoters from the ingest file, for the pre-game stat card that takes the
   *  leaderboard slot while we're waiting for players. */


  get topQuoters() {
    return this.weights.slice(0, 10);
  }

  startCard() {
    this.quotesUsed.clear();
    this.currentTruth = null;
    this.lastSeenRevealIndex = null;
    this.recentlyScored = new Set();
    this.ws.send({
      type: 'start_card',
      weights: this.weights
    });
  }

  newCard() {
    this.startCard();
  }

  nextQuote() {
    const pick = this.pickUnusedQuote();
    if (!pick) return;
    this.currentTruth = pick.canonicalName;
    const answers = this.buildAnswers(pick.canonicalName);
    this.ws.send({
      type: 'next_quote',
      quote: pick.quote,
      possibleAnswers: answers
    });
  }

  reveal() {
    if (!this.currentTruth) return;
    this.ws.send({
      type: 'reveal',
      truth: this.currentTruth
    });
    this.currentTruth = null;
  }

  endGameRequest() {
    this.endGameConfirming = true;
  }

  endGameCancel() {
    this.endGameConfirming = false;
  }

  endGameConfirm() {
    this.endGameConfirming = false;
    this.ws.send({
      type: 'end_game'
    });
  }

  clearLobbyRequest() {
    this.clearLobbyConfirming = true;
  }

  clearLobbyCancel() {
    this.clearLobbyConfirming = false;
  }

  clearLobbyConfirm() {
    this.clearLobbyConfirming = false;
    this.ws.send({
      type: 'clear_lobby'
    });
  }

  tokenIdFor(playerId) {
    var _a, _b;

    return (_b = (_a = this.state.players.find(p => p.playerId === playerId)) === null || _a === void 0 ? void 0 : _a.tokenId) !== null && _b !== void 0 ? _b : null;
  }

  trackPlayerId(_, p) {
    return p.playerId;
  }

  pickUnusedQuote() {
    const remaining = this.quotes.filter((_, i) => !this.quotesUsed.has(i));
    if (!remaining.length) return null;
    const idx = Math.floor(Math.random() * remaining.length);
    const original = this.quotes.indexOf(remaining[idx]);
    this.quotesUsed.add(original);
    return remaining[idx];
  }

  buildAnswers(truth) {
    const pool = this.nameRoster.filter(n => n !== truth);
    const decoys = [];

    while (decoys.length < 3 && pool.length) {
      const i = Math.floor(Math.random() * pool.length);
      decoys.push(pool.splice(i, 1)[0]);
    }

    return [truth, ...decoys].sort(() => Math.random() - 0.5);
  }

  ngOnDestroy() {
    if (this.deltaTimer) clearTimeout(this.deltaTimer);
    this.sub.unsubscribe();
  }

}

HostComponent.ɵfac = function HostComponent_Factory(t) {
  return new (t || HostComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_web_socket_service__WEBPACK_IMPORTED_MODULE_2__.WebSocketService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_game_state_service__WEBPACK_IMPORTED_MODULE_3__.GameStateService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_quote_ingest_service__WEBPACK_IMPORTED_MODULE_4__.QuoteIngestService));
};

HostComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: HostComponent,
  selectors: [["app-host"]],
  decls: 16,
  vars: 12,
  consts: [[1, "host"], [1, "hdr"], ["routerLink", "/", 1, "brand-link"], [1, "brand"], [1, "hdr-right"], [1, "sb-pill"], ["class", "session-controls", 4, "ngIf"], ["class", "main", 4, "ngIf", "ngIfElse"], ["class", "modal", 3, "click", 4, "ngIf"], ["loading", ""], [1, "session-controls"], ["title", "New card (rerolls everyone)", 1, "icon-btn", 3, "click"], ["title", "End game (back to lobby)", 1, "icon-btn", "danger", 3, "click"], [1, "main"], [1, "stage", "sb-card"], [4, "ngIf"], ["class", "leaderboard sb-card", 4, "ngIf", "ngIfElse"], ["preGameStats", ""], [1, "connecting-hero"], [1, "spinner", "big"], [1, "lobby-title"], [1, "lobby-sub"], [1, "lobby-hero"], [1, "player-tiles"], ["class", "player-tile", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "placeholder", 4, "ngIf"], [1, "lobby-actions"], [1, "sb-button", "primary", 3, "disabled", "click"], [1, "sb-button", "subtle", 3, "disabled", "click"], [1, "player-tile"], ["size", "lg", 3, "tokenId"], [1, "player-tile-name"], [1, "placeholder"], [4, "ngIf", "ngIfElse"], ["noQuote", ""], ["class", "bingo-banner sb-card", 4, "ngIf"], [1, "primary-action"], ["class", "sb-button primary big", 3, "click", 4, "ngIf"], ["class", "sb-button secondary big", 3, "click", 4, "ngIf"], ["class", "sb-button danger big", 3, "click", 4, "ngIf"], [1, "quote-stack"], [1, "quote-index"], [1, "big-quote"], [1, "answers-grid"], ["class", "answer-card", 3, "truth", "wrong", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "answer-card"], [1, "answer-chance"], [1, "answer-name"], ["class", "guessers", 4, "ngIf"], [1, "guessers"], [3, "correct", 4, "ngFor", "ngForOf"], ["size", "sm", 3, "tokenId"], [1, "guesser-name"], [1, "ready-hero"], [1, "how-to-play"], [1, "step-num"], [1, "bingo-banner", "sb-card"], [1, "bingo-headline"], [1, "bingo-sub"], [1, "bingo-winners"], [4, "ngFor", "ngForOf"], [1, "bingo-hint"], ["size", "md", 3, "tokenId"], [1, "sb-button", "primary", "big", 3, "click"], [1, "sb-button", "secondary", "big", 3, "click"], [1, "sb-button", "danger", "big", 3, "click"], [1, "leaderboard", "sb-card"], [1, "leaderboard-title"], [1, "leaderboard-list"], ["class", "leaderboard-row", 3, "first", "second", "third", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "leaderboard-row"], [1, "rank"], [1, "name"], [1, "score-block"], ["class", "delta", 4, "ngIf"], [1, "score"], [1, "delta"], [1, "leaderboard", "stats-card", "sb-card"], [1, "leaderboard-sub"], ["class", "leaderboard-row", 3, "first", "second", "third", 4, "ngFor", "ngForOf"], [1, "modal", 3, "click"], [1, "modal-card", "sb-card", 3, "click"], [1, "modal-actions"], [1, "sb-button", "ghost", 3, "click"], [1, "sb-button", "danger", 3, "click"], [1, "loading"]],
  template: function HostComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "header", 1)(2, "a", 2)(3, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "SUSSY ");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "BINGO");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 4)(8, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, HostComponent_div_10_Template, 5, 0, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, HostComponent_main_11_Template, 8, 5, "main", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, HostComponent_div_12_Template, 11, 0, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, HostComponent_div_13_Template, 11, 0, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, HostComponent_ng_template_14_Template, 4, 0, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](15);

      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("live", ctx.state.phase === "live")("lobby", ctx.state.phase === "lobby")("unknown", ctx.state.phase === "unknown");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx.state.phase === "unknown" ? "connecting" : ctx.state.phase, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.state.phase === "live");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.ingestReady)("ngIfElse", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.endGameConfirming);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.clearLobbyConfirming);
    }
  },
  directives: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _components_token_avatar_token_avatar_component__WEBPACK_IMPORTED_MODULE_5__.TokenAvatarComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.PercentPipe],
  styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%] {\n  display: block;\n  \n  --paper: #fffaee;\n  --paper-warm: #fff1d0;\n  --ink: #1a1330;\n  --tile: #ffffff;\n}\n.host[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: 1.5rem 2.5rem 2rem;\n  background: repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0 14px, transparent 14px 28px), radial-gradient(circle at top right, rgba(255, 209, 102, 0.4), transparent 55%), radial-gradient(circle at bottom left, rgba(76, 201, 240, 0.35), transparent 55%), linear-gradient(160deg, #ff8c42, #ef476f 45%, #b18aff);\n  background-attachment: fixed;\n  color: var(--ink);\n  overflow: hidden;\n  isolation: isolate;\n}\n\n.host[_ngcontent-%COMP%]   .sb-card[_ngcontent-%COMP%] {\n  background: var(--paper);\n  color: var(--ink);\n  border: 3px solid var(--ink);\n  border-radius: 18px;\n  box-shadow: 0 6px 0 var(--ink), 0 14px 28px rgba(0, 0, 0, 0.3);\n}\n\n.hdr[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1.5rem;\n  gap: 1rem;\n}\n.brand-link[_ngcontent-%COMP%] {\n  text-decoration: none;\n  display: inline-block;\n  transition: transform 120ms ease;\n}\n.brand-link[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.brand[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-size: 2.6rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  color: var(--accent-yellow);\n  text-shadow: -2px -2px 0 var(--ink), 2px -2px 0 var(--ink), -2px 2px 0 var(--ink), 2px 2px 0 var(--ink), 0 3px 0 var(--ink);\n}\n.brand[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--accent-purple);\n}\n.hdr-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.host[_ngcontent-%COMP%]   .sb-pill[_ngcontent-%COMP%] {\n  background: var(--paper);\n  color: var(--ink);\n  border: 3px solid var(--ink);\n  box-shadow: 0 3px 0 var(--ink);\n  padding: 0.3rem 0.75rem;\n  font-size: 0.7rem;\n}\n.session-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  font-family: \"Caveat\", cursive;\n  font-weight: 700;\n  font-size: 1.1rem;\n  background: var(--paper);\n  color: var(--ink);\n  border: 3px solid var(--ink);\n  border-radius: 12px;\n  padding: 0.4rem 0.9rem;\n  box-shadow: 0 3px 0 var(--ink);\n  transition: translate 80ms ease, box-shadow 80ms ease, background 120ms ease;\n  line-height: 1;\n}\n.icon-btn[_ngcontent-%COMP%]:hover {\n  background: var(--paper-warm);\n}\n.icon-btn[_ngcontent-%COMP%]:active {\n  translate: 0 2px;\n  box-shadow: 0 1px 0 var(--ink);\n}\n.icon-btn.danger[_ngcontent-%COMP%] {\n  background: var(--accent-red);\n}\n.icon-btn.danger[_ngcontent-%COMP%]:hover {\n  background: #ff6b8a;\n}\n\n.main[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 360px;\n  grid-gap: 1.75rem;\n  gap: 1.75rem;\n  align-items: start;\n}\n.stage[_ngcontent-%COMP%] {\n  padding: 2rem 2.5rem;\n  min-height: 68vh;\n  display: flex;\n  flex-direction: column;\n}\n\n.lobby-title[_ngcontent-%COMP%], .leaderboard-title[_ngcontent-%COMP%] {\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-weight: 400;\n  color: var(--ink);\n}\n\n.lobby-hero[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.lobby-title[_ngcontent-%COMP%] {\n  font-size: 2.8rem;\n  margin: 0;\n  letter-spacing: 0.02em;\n}\n.lobby-sub[_ngcontent-%COMP%] {\n  color: var(--ink);\n  opacity: 0.7;\n  margin: 0.5rem 0 0;\n  font-size: 1.15rem;\n  font-family: \"Caveat\", cursive;\n  font-weight: 700;\n}\n.player-tiles[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: flex-end;\n  gap: 1rem 1.25rem;\n  list-style: none;\n  padding: 1.5rem 1rem 2rem;\n  margin: 0 0 1.5rem;\n  flex: 1;\n  min-height: 200px;\n}\n.player-tile[_ngcontent-%COMP%] {\n  --tilt: 0deg;\n  padding: 1rem 1.1rem 0.85rem;\n  background: var(--tile);\n  color: var(--ink);\n  border: 3px solid var(--ink);\n  border-radius: 14px;\n  font-family: \"Caveat\", cursive;\n  font-size: 1.3rem;\n  font-weight: 700;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.65rem;\n  min-width: 140px;\n  box-shadow: 0 5px 0 var(--ink);\n  rotate: var(--tilt);\n  will-change: translate;\n  animation: tile-pop 360ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards, tile-bob 2.6s ease-in-out 360ms infinite;\n}\n.player-tile-name[_ngcontent-%COMP%] {\n  line-height: 1.1;\n}\n.player-tile[_ngcontent-%COMP%]:nth-child(5n+1) {\n  --tilt: 0deg;\n  animation-duration: 360ms, 2.6s;\n  animation-delay: 0ms, 360ms;\n}\n.player-tile[_ngcontent-%COMP%]:nth-child(5n+2) {\n  --tilt: -2deg;\n  animation-duration: 360ms, 2.1s;\n  animation-delay: 70ms, 280ms;\n}\n.player-tile[_ngcontent-%COMP%]:nth-child(5n+3) {\n  --tilt: 1.5deg;\n  animation-duration: 360ms, 2.9s;\n  animation-delay: 140ms, 420ms;\n}\n.player-tile[_ngcontent-%COMP%]:nth-child(5n+4) {\n  --tilt: -1deg;\n  animation-duration: 360ms, 2.3s;\n  animation-delay: 40ms, 200ms;\n}\n.player-tile[_ngcontent-%COMP%]:nth-child(5n+5) {\n  --tilt: 2.5deg;\n  animation-duration: 360ms, 2.75s;\n  animation-delay: 110ms, 380ms;\n}\n@keyframes tile-pop {\n  from {\n    transform: scale(0.4) translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1) translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes tile-bob {\n  0%, 100% {\n    translate: 0 0;\n  }\n  50% {\n    translate: 0 -10px;\n  }\n}\n.placeholder[_ngcontent-%COMP%] {\n  color: var(--ink);\n  opacity: 0.6;\n  padding: 1.5rem 1rem;\n  text-align: center;\n  border: 2px dashed var(--ink);\n  border-radius: 12px;\n  grid-column: 1/-1;\n  font-family: \"Caveat\", cursive;\n  font-size: 1.15rem;\n  font-weight: 700;\n}\n.leaderboard[_ngcontent-%COMP%]   .placeholder[_ngcontent-%COMP%] {\n  border: none;\n  padding: 1.5rem 0;\n}\n.lobby-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.ready-hero[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 2rem;\n}\n.how-to-play[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0 auto;\n  max-width: 540px;\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  font-family: \"Caveat\", cursive;\n  font-size: 1.35rem;\n  font-weight: 600;\n  line-height: 1.25;\n  color: var(--ink, #1a1330);\n}\n.how-to-play[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n  background: #ffffff;\n  border: 3px solid var(--ink, #1a1330);\n  border-radius: 14px;\n  padding: 0.7rem 1rem;\n  box-shadow: 0 3px 0 var(--ink, #1a1330);\n}\n.how-to-play[_ngcontent-%COMP%]   .step-num[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 50%;\n  background: var(--accent-yellow);\n  color: var(--ink, #1a1330);\n  border: 2px solid var(--ink, #1a1330);\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-size: 1rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 1;\n}\n.how-to-play[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 800;\n}\n\n.bingo-banner[_ngcontent-%COMP%] {\n  margin: 1rem auto 0;\n  max-width: 540px;\n  padding: 1.5rem 1.5rem 1.25rem;\n  background: var(--accent-yellow);\n  text-align: center;\n  animation: bingo-pop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 1100ms backwards;\n}\n.bingo-headline[_ngcontent-%COMP%] {\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-size: 3.4rem;\n  line-height: 1;\n  color: var(--ink);\n  text-shadow: 0 4px 0 rgba(0, 0, 0, 0.18);\n}\n.bingo-sub[_ngcontent-%COMP%] {\n  font-family: \"Caveat\", cursive;\n  font-size: 1.6rem;\n  font-weight: 700;\n  color: var(--ink);\n  margin-top: 0.6rem;\n}\n.bingo-winners[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 1rem 0 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  justify-content: center;\n}\n.bingo-winners[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: var(--tile);\n  border: 3px solid var(--ink);\n  border-radius: 999px;\n  padding: 0.25rem 0.95rem 0.25rem 0.3rem;\n  font-family: \"Caveat\", cursive;\n  font-weight: 700;\n  font-size: 1.2rem;\n  box-shadow: 0 3px 0 var(--ink);\n}\n.bingo-winners[_ngcontent-%COMP%]     .avatar.size-md {\n  width: 36px;\n  height: 36px;\n  outline: 3px solid var(--ink);\n  outline-offset: -3px;\n}\n.bingo-hint[_ngcontent-%COMP%] {\n  margin: 0.9rem 0 0;\n  font-family: \"Caveat\", cursive;\n  font-weight: 700;\n  font-size: 1.1rem;\n  color: var(--ink);\n  opacity: 0.75;\n}\n@keyframes bingo-pop {\n  0% {\n    transform: scale(0.5) rotate(-6deg);\n    opacity: 0;\n  }\n  60% {\n    transform: scale(1.06) rotate(2deg);\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1) rotate(0);\n    opacity: 1;\n  }\n}\n\n.quote-index[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--ink);\n  opacity: 0.55;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  font-weight: 700;\n  margin-bottom: 0.75rem;\n}\n.big-quote[_ngcontent-%COMP%] {\n  font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n  font-size: clamp(1.8rem, 3.6vw, 2.8rem);\n  line-height: 1.3;\n  font-weight: 500;\n  font-style: italic;\n  margin: 0 0 2rem;\n  padding-left: 1.25rem;\n  border-left: 6px solid var(--accent-yellow);\n  color: var(--ink);\n}\n.big-quote[_ngcontent-%COMP%]::before {\n  content: \"\u201C\";\n  margin-right: 0.05em;\n}\n.big-quote[_ngcontent-%COMP%]::after {\n  content: \"\u201D\";\n  margin-left: 0.05em;\n}\n\n.quote-stack[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n.answers-grid[_ngcontent-%COMP%] {\n  flex: 1;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(2, 1fr);\n  grid-gap: 1.25rem;\n  gap: 1.25rem;\n  margin: 0 0 1.5rem;\n  min-height: 0;\n}\n.answer-card[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 1.5rem 1.5rem;\n  background: var(--tile);\n  color: var(--ink);\n  border: 3px solid var(--ink);\n  border-radius: 18px;\n  box-shadow: 0 6px 0 var(--ink);\n  text-align: center;\n  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), background 300ms ease, opacity 300ms ease;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 0.6rem;\n  min-height: 0;\n}\n.answer-name[_ngcontent-%COMP%] {\n  font-family: \"Caveat\", cursive;\n  font-size: clamp(2.6rem, 5.5vw, 4.5rem);\n  font-weight: 700;\n  letter-spacing: 0.01em;\n  line-height: 1;\n}\n.answer-chance[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.8rem;\n  right: 1rem;\n  font-size: 1rem;\n  font-weight: 700;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: 0.05em;\n  color: var(--ink);\n  opacity: 0.5;\n  pointer-events: none;\n}\n.answers-grid.is-revealed[_ngcontent-%COMP%]   .answer-card[_ngcontent-%COMP%] {\n  opacity: 0.55;\n}\n.answer-card.truth[_ngcontent-%COMP%] {\n  background: var(--accent-green);\n  transform: scale(1.04);\n  opacity: 1 !important;\n  box-shadow: 0 5px 0 var(--ink), 0 0 0 4px rgba(6, 214, 160, 0.5);\n  animation: truth-pulse 1.2s ease-out;\n}\n@keyframes truth-pulse {\n  0% {\n    box-shadow: 0 5px 0 var(--ink), 0 0 0 0 rgba(6, 214, 160, 0.9);\n  }\n  100% {\n    box-shadow: 0 5px 0 var(--ink), 0 0 0 18px rgba(6, 214, 160, 0);\n  }\n}\n.answer-card.wrong[_ngcontent-%COMP%] {\n  filter: grayscale(0.3);\n}\n.guessers[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.3rem;\n  justify-content: center;\n}\n.guessers[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  background: var(--paper);\n  color: var(--ink);\n  border: 2px solid var(--ink);\n  padding: 0.15rem 0.55rem 0.15rem 0.25rem;\n  border-radius: 999px;\n  font-family: \"Caveat\", cursive;\n  font-size: 1rem;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n.guessers[_ngcontent-%COMP%]   .guesser-name[_ngcontent-%COMP%] {\n  line-height: 1;\n}\n.guessers[_ngcontent-%COMP%]   li.correct[_ngcontent-%COMP%] {\n  background: var(--accent-yellow);\n}\n.guessers[_ngcontent-%COMP%]   li.correct[_ngcontent-%COMP%]::before {\n  content: \"\u2713\";\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 800;\n}\n.guessers[_ngcontent-%COMP%]   li.no-guess[_ngcontent-%COMP%] {\n  background: transparent;\n  border-style: dashed;\n  opacity: 0.5;\n}\n\n.primary-action[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: 2rem;\n  display: flex;\n  justify-content: center;\n}\n.host[_ngcontent-%COMP%]   .sb-button[_ngcontent-%COMP%] {\n  background: var(--accent-yellow);\n  color: var(--ink);\n  border: 3px solid var(--ink);\n  border-radius: 14px;\n  box-shadow: 0 6px 0 var(--ink);\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-weight: 400;\n  letter-spacing: 0.02em;\n}\n.host[_ngcontent-%COMP%]   .sb-button[_ngcontent-%COMP%]:active {\n  transform: translateY(3px);\n  box-shadow: 0 2px 0 var(--ink);\n}\n.host[_ngcontent-%COMP%]   .sb-button.secondary[_ngcontent-%COMP%] {\n  background: var(--accent-blue);\n}\n.host[_ngcontent-%COMP%]   .sb-button.danger[_ngcontent-%COMP%] {\n  background: var(--accent-red);\n  color: var(--ink);\n}\n.host[_ngcontent-%COMP%]   .sb-button.ghost[_ngcontent-%COMP%] {\n  background: var(--paper);\n  color: var(--ink);\n}\n.host[_ngcontent-%COMP%]   .sb-button.subtle[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--ink);\n  border: 2px solid var(--ink);\n  box-shadow: none;\n  font-family: \"Caveat\", cursive;\n  font-size: 1rem;\n  padding: 0.45rem 0.9rem;\n  opacity: 0.75;\n}\n.host[_ngcontent-%COMP%]   .sb-button.subtle[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.host[_ngcontent-%COMP%]   .sb-button.subtle[_ngcontent-%COMP%]:active {\n  transform: translateY(1px);\n  box-shadow: none;\n}\n.host[_ngcontent-%COMP%]   .sb-button[_ngcontent-%COMP%]:disabled {\n  background: #cfc9b8;\n  color: rgba(26, 19, 48, 0.55);\n  box-shadow: 0 4px 0 var(--ink);\n}\n.sb-button.big[_ngcontent-%COMP%] {\n  font-size: 1.9rem;\n  padding: 1.1rem 2.5rem;\n  min-width: 280px;\n}\n\n.leaderboard[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  position: sticky;\n  top: 1.5rem;\n}\n.leaderboard-title[_ngcontent-%COMP%] {\n  margin: 0 0 1rem;\n  font-size: 1.8rem;\n  letter-spacing: 0.04em;\n  text-align: center;\n}\n.leaderboard-sub[_ngcontent-%COMP%] {\n  font-family: \"Caveat\", cursive;\n  font-weight: 700;\n  color: var(--ink);\n  opacity: 0.65;\n  margin: -0.5rem 0 0.9rem;\n  text-align: center;\n  font-size: 1rem;\n}\n.leaderboard-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.stats-card[_ngcontent-%COMP%]   .leaderboard-row[_ngcontent-%COMP%] {\n  grid-template-columns: 36px 1fr auto;\n}\n.leaderboard-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 36px auto 1fr auto;\n  align-items: center;\n  grid-gap: 0.75rem;\n  gap: 0.75rem;\n  padding: 0.7rem 0.6rem;\n  border-bottom: 2px dashed rgba(26, 19, 48, 0.25);\n  font-family: \"Caveat\", cursive;\n  font-weight: 700;\n  font-size: 1.35rem;\n  color: var(--ink);\n  transition: background 250ms ease;\n}\n.leaderboard-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.leaderboard-row[_ngcontent-%COMP%]   .rank[_ngcontent-%COMP%] {\n  font-weight: 700;\n  text-align: center;\n  font-size: 1.1rem;\n  opacity: 0.6;\n}\n.leaderboard-row[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  line-height: 1;\n}\n.score-block[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.5rem;\n}\n.score-block[_ngcontent-%COMP%]   .score[_ngcontent-%COMP%] {\n  font-weight: 800;\n  font-size: 1.7rem;\n  color: var(--ink);\n  background: var(--accent-yellow);\n  border: 2px solid var(--ink);\n  border-radius: 999px;\n  padding: 0.05rem 0.6rem;\n  min-width: 1.6em;\n  text-align: center;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.2;\n}\n.score-block[_ngcontent-%COMP%]   .delta[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: var(--ink);\n  background: var(--accent-green);\n  border: 2px solid var(--ink);\n  border-radius: 999px;\n  padding: 0 0.45rem;\n  font-size: 0.9rem;\n  line-height: 1.2;\n  animation: delta-rise 600ms ease-out;\n}\n@keyframes delta-rise {\n  from {\n    transform: translateY(8px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.leaderboard-row.first[_ngcontent-%COMP%] {\n  background: rgba(255, 209, 102, 0.4);\n  \n  border-radius: 10px;\n  border-bottom-color: transparent;\n}\n.leaderboard-row.second[_ngcontent-%COMP%] {\n  background: rgba(197, 201, 235, 0.45);\n  \n  border-radius: 10px;\n  border-bottom-color: transparent;\n}\n.leaderboard-row.third[_ngcontent-%COMP%] {\n  background: rgba(255, 140, 66, 0.28);\n  \n  border-radius: 10px;\n  border-bottom-color: transparent;\n}\n.leaderboard-row.first[_ngcontent-%COMP%]   .rank[_ngcontent-%COMP%], .leaderboard-row.second[_ngcontent-%COMP%]   .rank[_ngcontent-%COMP%], .leaderboard-row.third[_ngcontent-%COMP%]   .rank[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  opacity: 1;\n}\n\n.connecting-hero[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  text-align: center;\n  padding: 2rem;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 0;\n  color: var(--ink);\n  font-family: \"Caveat\", cursive;\n  font-weight: 700;\n  font-size: 1.3rem;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  margin: 0 auto 1rem;\n  border: 4px solid rgba(26, 19, 48, 0.2);\n  border-top-color: var(--ink);\n  border-radius: 50%;\n  animation: spin 800ms linear infinite;\n}\n.spinner.big[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-width: 5px;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(26, 19, 48, 0.65);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 100;\n  animation: fade-in 180ms ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  max-width: 420px;\n  padding: 2rem;\n  text-align: center;\n}\n.modal-card[_ngcontent-%COMP%]   .lobby-title[_ngcontent-%COMP%] {\n  font-size: 2.2rem;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n  margin-top: 1.5rem;\n}\n@keyframes fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@media (max-width: 960px) {\n  .main[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .leaderboard[_ngcontent-%COMP%] {\n    position: static;\n  }\n\n  .answers-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,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b3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICAvKiBTdGlja2VyLWJvb2sgcGFsZXR0ZTogY3JlYW0gcGFwZXIgb24gc2F0dXJhdGVkIHBhcnR5IGdyYWRpZW50LCBuZWFyLWJsYWNrIGluayAqL1xuICAtLXBhcGVyOiAjZmZmYWVlO1xuICAtLXBhcGVyLXdhcm06ICNmZmYxZDA7XG4gIC0taW5rOiAjMWExMzMwO1xuICAtLXRpbGU6ICNmZmZmZmY7XG59XG5cbi5ob3N0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgcGFkZGluZzogMS41cmVtIDIuNXJlbSAycmVtO1xuICBiYWNrZ3JvdW5kOlxuICAgIHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoMTM1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIDAgMTRweCwgdHJhbnNwYXJlbnQgMTRweCAyOHB4KSxcbiAgICByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IHRvcCByaWdodCwgcmdiYSgyNTUsIDIwOSwgMTAyLCAwLjQpLCB0cmFuc3BhcmVudCA1NSUpLFxuICAgIHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgYm90dG9tIGxlZnQsIHJnYmEoNzYsIDIwMSwgMjQwLCAwLjM1KSwgdHJhbnNwYXJlbnQgNTUlKSxcbiAgICBsaW5lYXItZ3JhZGllbnQoMTYwZGVnLCAjZmY4YzQyLCAjZWY0NzZmIDQ1JSwgI2IxOGFmZik7XG4gIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XG4gIGNvbG9yOiB2YXIoLS1pbmspO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBpc29sYXRpb246IGlzb2xhdGU7XG59XG5cbi8qID09PT09IFN0aWNrZXIgY2FyZHMgPT09PT0gKi9cbi5ob3N0IC5zYi1jYXJkIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tcGFwZXIpO1xuICBjb2xvcjogdmFyKC0taW5rKTtcbiAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0taW5rKTtcbiAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgYm94LXNoYWRvdzogMCA2cHggMCB2YXIoLS1pbmspLCAwIDE0cHggMjhweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG59XG5cbi8qID09PT09IEhlYWRlciA9PT09PSAqL1xuLmhkciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBnYXA6IDFyZW07XG59XG4uYnJhbmQtbGluayB7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTIwbXMgZWFzZTsgfVxuLmJyYW5kLWxpbms6aG92ZXIgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCk7IH1cbi5icmFuZCB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1mYW1pbHk6ICdQZXJtYW5lbnQgTWFya2VyJywgJ0JlbGVyZW4nLCBjdXJzaXZlO1xuICBmb250LXNpemU6IDIuNnJlbTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTtcbiAgY29sb3I6IHZhcigtLWFjY2VudC15ZWxsb3cpO1xuICB0ZXh0LXNoYWRvdzpcbiAgICAtMnB4IC0ycHggMCB2YXIoLS1pbmspLCAycHggLTJweCAwIHZhcigtLWluayksXG4gICAgLTJweCAgMnB4IDAgdmFyKC0taW5rKSwgMnB4ICAycHggMCB2YXIoLS1pbmspLFxuICAgICAwICAgIDNweCAwIHZhcigtLWluayk7XG59XG4uYnJhbmQgc3BhbiB7IGNvbG9yOiB2YXIoLS1hY2NlbnQtcHVycGxlKTsgfVxuXG4uaGRyLXJpZ2h0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxcmVtO1xufVxuXG4vKiBTdGF0dXMgcGlsbCDigJQgc3RpY2tlciB2YXJpYW50IGZvciB0aGUgYnJpZ2h0IGJnICovXG4uaG9zdCAuc2ItcGlsbCB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXBhcGVyKTtcbiAgY29sb3I6IHZhcigtLWluayk7XG4gIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWluayk7XG4gIGJveC1zaGFkb3c6IDAgM3B4IDAgdmFyKC0taW5rKTtcbiAgcGFkZGluZzogMC4zcmVtIDAuNzVyZW07XG4gIGZvbnQtc2l6ZTogMC43cmVtO1xufVxuXG4uc2Vzc2lvbi1jb250cm9scyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMC41cmVtO1xufVxuLmljb24tYnRuIHtcbiAgZm9udC1mYW1pbHk6ICdDYXZlYXQnLCBjdXJzaXZlO1xuICBmb250LXdlaWdodDogNzAwO1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgYmFja2dyb3VuZDogdmFyKC0tcGFwZXIpO1xuICBjb2xvcjogdmFyKC0taW5rKTtcbiAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0taW5rKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMC40cmVtIDAuOXJlbTtcbiAgYm94LXNoYWRvdzogMCAzcHggMCB2YXIoLS1pbmspO1xuICB0cmFuc2l0aW9uOiB0cmFuc2xhdGUgODBtcyBlYXNlLCBib3gtc2hhZG93IDgwbXMgZWFzZSwgYmFja2dyb3VuZCAxMjBtcyBlYXNlO1xuICBsaW5lLWhlaWdodDogMTtcbn1cbi5pY29uLWJ0bjpob3ZlciB7IGJhY2tncm91bmQ6IHZhcigtLXBhcGVyLXdhcm0pOyB9XG4uaWNvbi1idG46YWN0aXZlIHtcbiAgdHJhbnNsYXRlOiAwIDJweDtcbiAgYm94LXNoYWRvdzogMCAxcHggMCB2YXIoLS1pbmspO1xufVxuLmljb24tYnRuLmRhbmdlciB7IGJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1yZWQpOyB9XG4uaWNvbi1idG4uZGFuZ2VyOmhvdmVyIHsgYmFja2dyb3VuZDogI2ZmNmI4YTsgfVxuXG4vKiA9PT09PSBNYWluIGdyaWQgPT09PT0gKi9cbi5tYWluIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMCwgMWZyKSAzNjBweDtcbiAgZ2FwOiAxLjc1cmVtO1xuICBhbGlnbi1pdGVtczogc3RhcnQ7XG59XG4uc3RhZ2Uge1xuICBwYWRkaW5nOiAycmVtIDIuNXJlbTtcbiAgbWluLWhlaWdodDogNjh2aDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLyogPT09PT0gTWFya2VyIHRpdGxlcyA9PT09PSAqL1xuLmxvYmJ5LXRpdGxlLCAubGVhZGVyYm9hcmQtdGl0bGUge1xuICBmb250LWZhbWlseTogJ1Blcm1hbmVudCBNYXJrZXInLCAnQmVsZXJlbicsIGN1cnNpdmU7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGNvbG9yOiB2YXIoLS1pbmspO1xufVxuXG4vKiA9PT09PSBMb2JieSA9PT09PSAqL1xuLmxvYmJ5LWhlcm8geyB0ZXh0LWFsaWduOiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDJyZW07IH1cbi5sb2JieS10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMi44cmVtO1xuICBtYXJnaW46IDA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAyZW07XG59XG4ubG9iYnktc3ViIHtcbiAgY29sb3I6IHZhcigtLWluayk7XG4gIG9wYWNpdHk6IDAuNztcbiAgbWFyZ2luOiAwLjVyZW0gMCAwO1xuICBmb250LXNpemU6IDEuMTVyZW07XG4gIGZvbnQtZmFtaWx5OiAnQ2F2ZWF0JywgY3Vyc2l2ZTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5wbGF5ZXItdGlsZXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIGdhcDogMXJlbSAxLjI1cmVtO1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAxLjVyZW0gMXJlbSAycmVtO1xuICBtYXJnaW46IDAgMCAxLjVyZW07XG4gIGZsZXg6IDE7XG4gIG1pbi1oZWlnaHQ6IDIwMHB4O1xufVxuLnBsYXllci10aWxlIHtcbiAgLS10aWx0OiAwZGVnO1xuICBwYWRkaW5nOiAxcmVtIDEuMXJlbSAwLjg1cmVtO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10aWxlKTtcbiAgY29sb3I6IHZhcigtLWluayk7XG4gIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWluayk7XG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gIGZvbnQtZmFtaWx5OiAnQ2F2ZWF0JywgY3Vyc2l2ZTtcbiAgZm9udC1zaXplOiAxLjNyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjY1cmVtO1xuICBtaW4td2lkdGg6IDE0MHB4O1xuICBib3gtc2hhZG93OiAwIDVweCAwIHZhcigtLWluayk7XG4gIHJvdGF0ZTogdmFyKC0tdGlsdCk7XG4gIHdpbGwtY2hhbmdlOiB0cmFuc2xhdGU7XG4gIGFuaW1hdGlvbjpcbiAgICB0aWxlLXBvcCAzNjBtcyBjdWJpYy1iZXppZXIoMC4zNCwgMS41NiwgMC42NCwgMSkgYmFja3dhcmRzLFxuICAgIHRpbGUtYm9iIDIuNnMgZWFzZS1pbi1vdXQgMzYwbXMgaW5maW5pdGU7XG59XG4ucGxheWVyLXRpbGUtbmFtZSB7IGxpbmUtaGVpZ2h0OiAxLjE7IH1cbi5wbGF5ZXItdGlsZTpudGgtY2hpbGQoNW4rMSkgeyAtLXRpbHQ6ICAwZGVnOyAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMzYwbXMsIDIuNnM7IGFuaW1hdGlvbi1kZWxheTogMG1zLCAgICAzNjBtczsgfVxuLnBsYXllci10aWxlOm50aC1jaGlsZCg1bisyKSB7IC0tdGlsdDogLTJkZWc7ICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAzNjBtcywgMi4xczsgYW5pbWF0aW9uLWRlbGF5OiA3MG1zLCAgIDI4MG1zOyB9XG4ucGxheWVyLXRpbGU6bnRoLWNoaWxkKDVuKzMpIHsgLS10aWx0OiAgMS41ZGVnOyBhbmltYXRpb24tZHVyYXRpb246IDM2MG1zLCAyLjlzOyBhbmltYXRpb24tZGVsYXk6IDE0MG1zLCAgNDIwbXM7IH1cbi5wbGF5ZXItdGlsZTpudGgtY2hpbGQoNW4rNCkgeyAtLXRpbHQ6IC0xZGVnOyAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMzYwbXMsIDIuM3M7IGFuaW1hdGlvbi1kZWxheTogNDBtcywgICAyMDBtczsgfVxuLnBsYXllci10aWxlOm50aC1jaGlsZCg1bis1KSB7IC0tdGlsdDogIDIuNWRlZzsgYW5pbWF0aW9uLWR1cmF0aW9uOiAzNjBtcywgMi43NXM7IGFuaW1hdGlvbi1kZWxheTogMTEwbXMsIDM4MG1zOyB9XG5cbkBrZXlmcmFtZXMgdGlsZS1wb3Age1xuICBmcm9tIHsgdHJhbnNmb3JtOiBzY2FsZSgwLjQpIHRyYW5zbGF0ZVkoMjBweCk7IG9wYWNpdHk6IDA7IH1cbiAgdG8gICB7IHRyYW5zZm9ybTogc2NhbGUoMSkgdHJhbnNsYXRlWSgwKTsgb3BhY2l0eTogMTsgfVxufVxuQGtleWZyYW1lcyB0aWxlLWJvYiB7XG4gIDAlLCAxMDAlIHsgdHJhbnNsYXRlOiAwIDA7IH1cbiAgNTAlICAgICAgeyB0cmFuc2xhdGU6IDAgLTEwcHg7IH1cbn1cblxuLnBsYWNlaG9sZGVyIHtcbiAgY29sb3I6IHZhcigtLWluayk7XG4gIG9wYWNpdHk6IDAuNjtcbiAgcGFkZGluZzogMS41cmVtIDFyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyOiAycHggZGFzaGVkIHZhcigtLWluayk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGdyaWQtY29sdW1uOiAxIC8gLTE7XG4gIGZvbnQtZmFtaWx5OiAnQ2F2ZWF0JywgY3Vyc2l2ZTtcbiAgZm9udC1zaXplOiAxLjE1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLmxlYWRlcmJvYXJkIC5wbGFjZWhvbGRlciB7IGJvcmRlcjogbm9uZTsgcGFkZGluZzogMS41cmVtIDA7IH1cbi5sb2JieS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogMC43NXJlbTtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuLnJlYWR5LWhlcm8geyB0ZXh0LWFsaWduOiBjZW50ZXI7IHBhZGRpbmc6IDNyZW0gMDsgZmxleDogMTsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGdhcDogMnJlbTsgfVxuXG4uaG93LXRvLXBsYXkge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDAgYXV0bztcbiAgbWF4LXdpZHRoOiA1NDBweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAwLjc1cmVtO1xuICBmb250LWZhbWlseTogJ0NhdmVhdCcsIGN1cnNpdmU7XG4gIGZvbnQtc2l6ZTogMS4zNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGluZS1oZWlnaHQ6IDEuMjU7XG4gIGNvbG9yOiB2YXIoLS1pbmssICMxYTEzMzApO1xufVxuLmhvdy10by1wbGF5IGxpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjlyZW07XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWluaywgIzFhMTMzMCk7XG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gIHBhZGRpbmc6IDAuN3JlbSAxcmVtO1xuICBib3gtc2hhZG93OiAwIDNweCAwIHZhcigtLWluaywgIzFhMTMzMCk7XG59XG4uaG93LXRvLXBsYXkgLnN0ZXAtbnVtIHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LXllbGxvdyk7XG4gIGNvbG9yOiB2YXIoLS1pbmssICMxYTEzMzApO1xuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1pbmssICMxYTEzMzApO1xuICBmb250LWZhbWlseTogJ1Blcm1hbmVudCBNYXJrZXInLCAnQmVsZXJlbicsIGN1cnNpdmU7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBsaW5lLWhlaWdodDogMTtcbn1cbi5ob3ctdG8tcGxheSBzdHJvbmcgeyBmb250LXdlaWdodDogODAwOyB9XG5cbi8qID09PT09IEJpbmdvIHdpbiBiYW5uZXIgKGhvc3QpID09PT09ICovXG4uYmluZ28tYmFubmVyIHtcbiAgbWFyZ2luOiAxcmVtIGF1dG8gMDtcbiAgbWF4LXdpZHRoOiA1NDBweDtcbiAgcGFkZGluZzogMS41cmVtIDEuNXJlbSAxLjI1cmVtO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQteWVsbG93KTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBhbmltYXRpb246IGJpbmdvLXBvcCA2MDBtcyBjdWJpYy1iZXppZXIoMC4zNCwgMS41NiwgMC42NCwgMSkgMTEwMG1zIGJhY2t3YXJkcztcbn1cbi5iaW5nby1oZWFkbGluZSB7XG4gIGZvbnQtZmFtaWx5OiAnUGVybWFuZW50IE1hcmtlcicsICdCZWxlcmVuJywgY3Vyc2l2ZTtcbiAgZm9udC1zaXplOiAzLjRyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBjb2xvcjogdmFyKC0taW5rKTtcbiAgdGV4dC1zaGFkb3c6IDAgNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjE4KTtcbn1cbi5iaW5nby1zdWIge1xuICBmb250LWZhbWlseTogJ0NhdmVhdCcsIGN1cnNpdmU7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogdmFyKC0taW5rKTtcbiAgbWFyZ2luLXRvcDogMC42cmVtO1xufVxuLmJpbmdvLXdpbm5lcnMge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDFyZW0gMCAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogMC43NXJlbTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4uYmluZ28td2lubmVycyBsaSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuNXJlbTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGlsZSk7XG4gIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWluayk7XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBwYWRkaW5nOiAwLjI1cmVtIDAuOTVyZW0gMC4yNXJlbSAwLjNyZW07XG4gIGZvbnQtZmFtaWx5OiAnQ2F2ZWF0JywgY3Vyc2l2ZTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGJveC1zaGFkb3c6IDAgM3B4IDAgdmFyKC0taW5rKTtcbn1cbi5iaW5nby13aW5uZXJzIDo6bmctZGVlcCAuYXZhdGFyLnNpemUtbWQgeyB3aWR0aDogMzZweDsgaGVpZ2h0OiAzNnB4OyBvdXRsaW5lOiAzcHggc29saWQgdmFyKC0taW5rKTsgb3V0bGluZS1vZmZzZXQ6IC0zcHg7IH1cbi5iaW5nby1oaW50IHtcbiAgbWFyZ2luOiAwLjlyZW0gMCAwO1xuICBmb250LWZhbWlseTogJ0NhdmVhdCcsIGN1cnNpdmU7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xuICBjb2xvcjogdmFyKC0taW5rKTtcbiAgb3BhY2l0eTogMC43NTtcbn1cbkBrZXlmcmFtZXMgYmluZ28tcG9wIHtcbiAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMC41KSByb3RhdGUoLTZkZWcpOyBvcGFjaXR5OiAwOyB9XG4gIDYwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMDYpIHJvdGF0ZSgyZGVnKTsgIG9wYWNpdHk6IDE7IH1cbiAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSkgcm90YXRlKDApOyBvcGFjaXR5OiAxOyB9XG59XG5cbi8qID09PT09IFF1b3RlIC8gbGl2ZSA9PT09PSAqL1xuLnF1b3RlLWluZGV4IHtcbiAgZm9udC1zaXplOiAwLjhyZW07XG4gIGNvbG9yOiB2YXIoLS1pbmspO1xuICBvcGFjaXR5OiAwLjU1O1xuICBsZXR0ZXItc3BhY2luZzogMC4yZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIG1hcmdpbi1ib3R0b206IDAuNzVyZW07XG59XG4uYmlnLXF1b3RlIHtcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IGNsYW1wKDEuOHJlbSwgMy42dncsIDIuOHJlbSk7XG4gIGxpbmUtaGVpZ2h0OiAxLjM7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgbWFyZ2luOiAwIDAgMnJlbTtcbiAgcGFkZGluZy1sZWZ0OiAxLjI1cmVtO1xuICBib3JkZXItbGVmdDogNnB4IHNvbGlkIHZhcigtLWFjY2VudC15ZWxsb3cpO1xuICBjb2xvcjogdmFyKC0taW5rKTtcbn1cbi5iaWctcXVvdGU6OmJlZm9yZSB7IGNvbnRlbnQ6ICfigJwnOyBtYXJnaW4tcmlnaHQ6IDAuMDVlbTsgfVxuLmJpZy1xdW90ZTo6YWZ0ZXIgeyBjb250ZW50OiAn4oCdJzsgbWFyZ2luLWxlZnQ6IDAuMDVlbTsgfVxuXG4vKiA9PT09PSBBbnN3ZXIgY2FyZHMgKDJ4Mikg4oCUIHN0aWNrZXIgc3R5bGUgPT09PT0gKi9cbi5xdW90ZS1zdGFjayB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi1oZWlnaHQ6IDA7XG59XG4uYW5zd2Vycy1ncmlkIHtcbiAgZmxleDogMTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTtcbiAgZ2FwOiAxLjI1cmVtO1xuICBtYXJnaW46IDAgMCAxLjVyZW07XG4gIG1pbi1oZWlnaHQ6IDA7XG59XG4uYW5zd2VyLWNhcmQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmc6IDEuNXJlbSAxLjVyZW07XG4gIGJhY2tncm91bmQ6IHZhcigtLXRpbGUpO1xuICBjb2xvcjogdmFyKC0taW5rKTtcbiAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0taW5rKTtcbiAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgYm94LXNoYWRvdzogMCA2cHggMCB2YXIoLS1pbmspO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAzMDBtcyBjdWJpYy1iZXppZXIoMC4zNCwgMS41NiwgMC42NCwgMSksIGJhY2tncm91bmQgMzAwbXMgZWFzZSwgb3BhY2l0eSAzMDBtcyBlYXNlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAwLjZyZW07XG4gIG1pbi1oZWlnaHQ6IDA7XG59XG4uYW5zd2VyLW5hbWUge1xuICBmb250LWZhbWlseTogJ0NhdmVhdCcsIGN1cnNpdmU7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMi42cmVtLCA1LjV2dywgNC41cmVtKTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDFlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG4uYW5zd2VyLWNoYW5jZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwLjhyZW07XG4gIHJpZ2h0OiAxcmVtO1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGZvbnQtdmFyaWFudC1udW1lcmljOiB0YWJ1bGFyLW51bXM7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XG4gIGNvbG9yOiB2YXIoLS1pbmspO1xuICBvcGFjaXR5OiAwLjU7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLmFuc3dlcnMtZ3JpZC5pcy1yZXZlYWxlZCAuYW5zd2VyLWNhcmQgeyBvcGFjaXR5OiAwLjU1OyB9XG4uYW5zd2VyLWNhcmQudHJ1dGgge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQtZ3JlZW4pO1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDQpO1xuICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IDAgNXB4IDAgdmFyKC0taW5rKSwgMCAwIDAgNHB4IHJnYmEoNiwgMjE0LCAxNjAsIDAuNSk7XG4gIGFuaW1hdGlvbjogdHJ1dGgtcHVsc2UgMS4ycyBlYXNlLW91dDtcbn1cbkBrZXlmcmFtZXMgdHJ1dGgtcHVsc2Uge1xuICAwJSAgIHsgYm94LXNoYWRvdzogMCA1cHggMCB2YXIoLS1pbmspLCAwIDAgMCAwIHJnYmEoNiwgMjE0LCAxNjAsIDAuOSk7IH1cbiAgMTAwJSB7IGJveC1zaGFkb3c6IDAgNXB4IDAgdmFyKC0taW5rKSwgMCAwIDAgMThweCByZ2JhKDYsIDIxNCwgMTYwLCAwKTsgfVxufVxuLmFuc3dlci1jYXJkLndyb25nIHsgZmlsdGVyOiBncmF5c2NhbGUoMC4zKTsgfVxuXG4uZ3Vlc3NlcnMge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAwLjNyZW07XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuLmd1ZXNzZXJzIGxpIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tcGFwZXIpO1xuICBjb2xvcjogdmFyKC0taW5rKTtcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0taW5rKTtcbiAgcGFkZGluZzogMC4xNXJlbSAwLjU1cmVtIDAuMTVyZW0gMC4yNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGZvbnQtZmFtaWx5OiAnQ2F2ZWF0JywgY3Vyc2l2ZTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjM1cmVtO1xufVxuLmd1ZXNzZXJzIC5ndWVzc2VyLW5hbWUgeyBsaW5lLWhlaWdodDogMTsgfVxuLmd1ZXNzZXJzIGxpLmNvcnJlY3QgeyBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQteWVsbG93KTsgfVxuLmd1ZXNzZXJzIGxpLmNvcnJlY3Q6OmJlZm9yZSB7IGNvbnRlbnQ6ICfinJMnOyBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7IGZvbnQtd2VpZ2h0OiA4MDA7IH1cbi5ndWVzc2VycyBsaS5uby1ndWVzcyB7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBib3JkZXItc3R5bGU6IGRhc2hlZDsgb3BhY2l0eTogMC41OyB9XG5cbi8qID09PT09IFByaW1hcnkgYWN0aW9uID09PT09ICovXG4ucHJpbWFyeS1hY3Rpb24ge1xuICBtYXJnaW4tdG9wOiBhdXRvO1xuICBwYWRkaW5nLXRvcDogMnJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4uaG9zdCAuc2ItYnV0dG9uIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LXllbGxvdyk7XG4gIGNvbG9yOiB2YXIoLS1pbmspO1xuICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1pbmspO1xuICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICBib3gtc2hhZG93OiAwIDZweCAwIHZhcigtLWluayk7XG4gIGZvbnQtZmFtaWx5OiAnUGVybWFuZW50IE1hcmtlcicsICdCZWxlcmVuJywgY3Vyc2l2ZTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDJlbTtcbn1cbi5ob3N0IC5zYi1idXR0b246YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDNweCk7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDAgdmFyKC0taW5rKTtcbn1cbi5ob3N0IC5zYi1idXR0b24uc2Vjb25kYXJ5IHsgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LWJsdWUpOyB9XG4uaG9zdCAuc2ItYnV0dG9uLmRhbmdlciB7IGJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1yZWQpOyBjb2xvcjogdmFyKC0taW5rKTsgfVxuLmhvc3QgLnNiLWJ1dHRvbi5naG9zdCB7IGJhY2tncm91bmQ6IHZhcigtLXBhcGVyKTsgY29sb3I6IHZhcigtLWluayk7IH1cbi5ob3N0IC5zYi1idXR0b24uc3VidGxlIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiB2YXIoLS1pbmspO1xuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1pbmspO1xuICBib3gtc2hhZG93OiBub25lO1xuICBmb250LWZhbWlseTogJ0NhdmVhdCcsIGN1cnNpdmU7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgcGFkZGluZzogMC40NXJlbSAwLjlyZW07XG4gIG9wYWNpdHk6IDAuNzU7XG59XG4uaG9zdCAuc2ItYnV0dG9uLnN1YnRsZTpob3ZlciB7IG9wYWNpdHk6IDE7IH1cbi5ob3N0IC5zYi1idXR0b24uc3VidGxlOmFjdGl2ZSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxcHgpOyBib3gtc2hhZG93OiBub25lOyB9XG4uaG9zdCAuc2ItYnV0dG9uOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogI2NmYzliODtcbiAgY29sb3I6IHJnYmEoMjYsIDE5LCA0OCwgMC41NSk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDAgdmFyKC0taW5rKTtcbn1cbi5zYi1idXR0b24uYmlnIHtcbiAgZm9udC1zaXplOiAxLjlyZW07XG4gIHBhZGRpbmc6IDEuMXJlbSAyLjVyZW07XG4gIG1pbi13aWR0aDogMjgwcHg7XG59XG5cbi8qID09PT09IExlYWRlcmJvYXJkID09PT09ICovXG4ubGVhZGVyYm9hcmQgeyBwYWRkaW5nOiAxLjVyZW07IHBvc2l0aW9uOiBzdGlja3k7IHRvcDogMS41cmVtOyB9XG4ubGVhZGVyYm9hcmQtdGl0bGUge1xuICBtYXJnaW46IDAgMCAxcmVtO1xuICBmb250LXNpemU6IDEuOHJlbTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmxlYWRlcmJvYXJkLXN1YiB7XG4gIGZvbnQtZmFtaWx5OiAnQ2F2ZWF0JywgY3Vyc2l2ZTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLWluayk7XG4gIG9wYWNpdHk6IDAuNjU7XG4gIG1hcmdpbjogLTAuNXJlbSAwIDAuOXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDFyZW07XG59XG4ubGVhZGVyYm9hcmQtbGlzdCB7IGxpc3Qtc3R5bGU6IG5vbmU7IHBhZGRpbmc6IDA7IG1hcmdpbjogMDsgfVxuLnN0YXRzLWNhcmQgLmxlYWRlcmJvYXJkLXJvdyB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzZweCAxZnIgYXV0bzsgfVxuLmxlYWRlcmJvYXJkLXJvdyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzZweCBhdXRvIDFmciBhdXRvO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuNzVyZW07XG4gIHBhZGRpbmc6IDAuN3JlbSAwLjZyZW07XG4gIGJvcmRlci1ib3R0b206IDJweCBkYXNoZWQgcmdiYSgyNiwgMTksIDQ4LCAwLjI1KTtcbiAgZm9udC1mYW1pbHk6ICdDYXZlYXQnLCBjdXJzaXZlO1xuICBmb250LXdlaWdodDogNzAwO1xuICBmb250LXNpemU6IDEuMzVyZW07XG4gIGNvbG9yOiB2YXIoLS1pbmspO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDI1MG1zIGVhc2U7XG59XG4ubGVhZGVyYm9hcmQtcm93Omxhc3QtY2hpbGQgeyBib3JkZXItYm90dG9tOiBub25lOyB9XG4ubGVhZGVyYm9hcmQtcm93IC5yYW5rIHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgb3BhY2l0eTogMC42O1xufVxuLmxlYWRlcmJvYXJkLXJvdyAubmFtZSB7IGxpbmUtaGVpZ2h0OiAxOyB9XG4uc2NvcmUtYmxvY2sgeyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogYmFzZWxpbmU7IGdhcDogMC41cmVtOyB9XG4uc2NvcmUtYmxvY2sgLnNjb3JlIHtcbiAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgZm9udC1zaXplOiAxLjdyZW07XG4gIGNvbG9yOiB2YXIoLS1pbmspO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQteWVsbG93KTtcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0taW5rKTtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIHBhZGRpbmc6IDAuMDVyZW0gMC42cmVtO1xuICBtaW4td2lkdGg6IDEuNmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtdmFyaWFudC1udW1lcmljOiB0YWJ1bGFyLW51bXM7XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG59XG4uc2NvcmUtYmxvY2sgLmRlbHRhIHtcbiAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgY29sb3I6IHZhcigtLWluayk7XG4gIGJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1ncmVlbik7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWluayk7XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBwYWRkaW5nOiAwIDAuNDVyZW07XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xuICBsaW5lLWhlaWdodDogMS4yO1xuICBhbmltYXRpb246IGRlbHRhLXJpc2UgNjAwbXMgZWFzZS1vdXQ7XG59XG5Aa2V5ZnJhbWVzIGRlbHRhLXJpc2Uge1xuICBmcm9tIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDhweCk7IG9wYWNpdHk6IDA7IH1cbiAgdG8gICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgb3BhY2l0eTogMTsgfVxufVxuLmxlYWRlcmJvYXJkLXJvdy5maXJzdCB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyMDksIDEwMiwgMC40KTsgLyogZ29sZCAqL1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbi5sZWFkZXJib2FyZC1yb3cuc2Vjb25kIHtcbiAgYmFja2dyb3VuZDogcmdiYSgxOTcsIDIwMSwgMjM1LCAwLjQ1KTsgLyogc2lsdmVyIOKAlCBkZXNhdHVyYXRlZCBibHVlLWdyZXkgKi9cbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4ubGVhZGVyYm9hcmQtcm93LnRoaXJkIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDE0MCwgNjYsIDAuMjgpOyAvKiBicm9uemUg4oCUIGFjY2VudC1vcmFuZ2Ugc29mdGVuZWQgKi9cbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4ubGVhZGVyYm9hcmQtcm93LmZpcnN0IC5yYW5rLFxuLmxlYWRlcmJvYXJkLXJvdy5zZWNvbmQgLnJhbmssXG4ubGVhZGVyYm9hcmQtcm93LnRoaXJkIC5yYW5rIHsgZm9udC1zaXplOiAxLjVyZW07IG9wYWNpdHk6IDE7IH1cblxuLyogPT09PT0gTG9hZGluZyAvIGNvbm5lY3RpbmcgPT09PT0gKi9cbi5jb25uZWN0aW5nLWhlcm8ge1xuICBmbGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxcmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDJyZW07XG59XG4ubG9hZGluZyB7IHRleHQtYWxpZ246IGNlbnRlcjsgcGFkZGluZzogNHJlbSAwOyBjb2xvcjogdmFyKC0taW5rKTsgZm9udC1mYW1pbHk6ICdDYXZlYXQnLCBjdXJzaXZlOyBmb250LXdlaWdodDogNzAwOyBmb250LXNpemU6IDEuM3JlbTsgfVxuLnNwaW5uZXIge1xuICB3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyBtYXJnaW46IDAgYXV0byAxcmVtO1xuICBib3JkZXI6IDRweCBzb2xpZCByZ2JhKDI2LCAxOSwgNDgsIDAuMik7XG4gIGJvcmRlci10b3AtY29sb3I6IHZhcigtLWluayk7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYW5pbWF0aW9uOiBzcGluIDgwMG1zIGxpbmVhciBpbmZpbml0ZTtcbn1cbi5zcGlubmVyLmJpZyB7IHdpZHRoOiA2NHB4OyBoZWlnaHQ6IDY0cHg7IGJvcmRlci13aWR0aDogNXB4OyB9XG5Aa2V5ZnJhbWVzIHNwaW4geyB0byB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfVxuXG4vKiA9PT09PSBNb2RhbCA9PT09PSAqL1xuLm1vZGFsIHtcbiAgcG9zaXRpb246IGZpeGVkOyBpbnNldDogMDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNiwgMTksIDQ4LCAwLjY1KTtcbiAgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHotaW5kZXg6IDEwMDtcbiAgYW5pbWF0aW9uOiBmYWRlLWluIDE4MG1zIGVhc2U7XG59XG4ubW9kYWwtY2FyZCB7XG4gIG1heC13aWR0aDogNDIwcHg7XG4gIHBhZGRpbmc6IDJyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5tb2RhbC1jYXJkIC5sb2JieS10aXRsZSB7IGZvbnQtc2l6ZTogMi4ycmVtOyB9XG4ubW9kYWwtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7IGdhcDogMC43NXJlbTsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cbkBrZXlmcmFtZXMgZmFkZS1pbiB7IGZyb20geyBvcGFjaXR5OiAwOyB9IHRvIHsgb3BhY2l0eTogMTsgfSB9XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NjBweCkge1xuICAubWFpbiB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyOyB9XG4gIC5sZWFkZXJib2FyZCB7IHBvc2l0aW9uOiBzdGF0aWM7IH1cbiAgLmFuc3dlcnMtZ3JpZCB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyOyB9XG59XG4iXX0= */"],
  data: {
    animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.trigger)('quoteIn', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.transition)('* => *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.query)('.quote-index, .big-quote', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.style)({
      opacity: 0,
      transform: 'translateY(14px)'
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.stagger)(90, [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.animate)('360ms cubic-bezier(0.34, 1.56, 0.64, 1)', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.style)({
      opacity: 1,
      transform: 'translateY(0)'
    }))])], {
      optional: true
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.query)('.answer-card', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.style)({
      opacity: 0,
      transform: 'translateY(22px) scale(0.9)'
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.stagger)(80, [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.animate)('420ms cubic-bezier(0.34, 1.56, 0.64, 1)', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.style)({
      opacity: 1,
      transform: 'translateY(0) scale(1)'
    }))])], {
      optional: true
    })])])]
  }
});

/***/ }),

/***/ 2768:
/*!****************************************************!*\
  !*** ./src/app/pages/landing/landing.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LandingComponent": () => (/* binding */ LandingComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 2816);


class LandingComponent {
}
LandingComponent.ɵfac = function LandingComponent_Factory(t) { return new (t || LandingComponent)(); };
LandingComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LandingComponent, selectors: [["app-landing"]], decls: 14, vars: 0, consts: [[1, "landing"], [1, "bg-glow"], [1, "title-block"], [1, "title"], [1, "tagline"], [1, "cta"], ["routerLink", "/play", 1, "sb-button", "primary"], ["routerLink", "/host", 1, "sb-button", "secondary"], ["routerLink", "/cloud", 1, "cloud-link"]], template: function LandingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2)(3, "h1", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "SUSSY BINGO");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Who said it? Tap fast. Score points. Embarrass your friends.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "nav", 5)(8, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\uD83C\uDFAE\u00A0 Join the Game");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "\uD83D\uDCFA\u00A0 Host on this TV");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Word Cloud \u2192");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLinkWithHref], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.landing[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 3rem;\n  padding: 2rem;\n  position: relative;\n  overflow: hidden;\n  background: radial-gradient(ellipse at top, rgba(177, 138, 255, 0.15), transparent 60%), radial-gradient(ellipse at bottom, rgba(76, 201, 240, 0.15), transparent 60%), var(--bg-deep);\n}\n\n.bg-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.02) 0, rgba(255, 255, 255, 0.02) 2px, transparent 2px, transparent 22px);\n  pointer-events: none;\n}\n\n.title-block[_ngcontent-%COMP%] {\n  text-align: center;\n  z-index: 1;\n}\n\n.title[_ngcontent-%COMP%] {\n  font-family: \"Beleren\", \"Roboto\", serif;\n  font-size: clamp(3rem, 10vw, 6rem);\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  line-height: 1.25;\n  margin: 0;\n  padding: 0.15em 0.05em;\n  display: inline-block;\n  background: linear-gradient(135deg, #ffd166 0%, #ef476f 50%, #b18aff 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  filter: drop-shadow(0 4px 20px rgba(255, 209, 102, 0.35));\n  animation: float 4s ease-in-out infinite;\n}\n\n@keyframes float {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-6px);\n  }\n}\n\n.tagline[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--text-dim);\n  margin: 0.75rem 0 0;\n  letter-spacing: 0.04em;\n}\n\n.cta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  z-index: 1;\n  width: 100%;\n  max-width: 360px;\n}\n\n.cta[_ngcontent-%COMP%]   .sb-button[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.cloud-link[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  text-decoration: none;\n  font-size: 0.95rem;\n  letter-spacing: 0.05em;\n  z-index: 1;\n  transition: color 120ms ease;\n}\n\n.cloud-link[_ngcontent-%COMP%]:hover {\n  color: var(--accent-yellow);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhbmRpbmcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBUSxjQUFBO0FBRVI7O0FBQUE7RUFDRSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzTEFDRTtBQUVKOztBQUdBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsaUpBQ0U7RUFPRixvQkFBQTtBQVBGOztBQVVBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0FBUEY7O0FBVUE7RUFDRSx1Q0FBQTtFQUNBLGtDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0EsU0FBQTtFQUNBLHNCQUFBO0VBQ0EscUJBQUE7RUFDQSwwRUFBQTtFQUNBLDZCQUFBO0VBQ0EscUJBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0VBQ0EseURBQUE7RUFDQSx3Q0FBQTtBQVBGOztBQVVBO0VBQ0U7SUFBVyx3QkFBQTtFQU5YO0VBT0E7SUFBTSwyQkFBQTtFQUpOO0FBQ0Y7O0FBTUE7RUFDRSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtBQUpGOztBQU9BO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFKRjs7QUFNQTtFQUFrQixXQUFBO0FBRmxCOztBQUlBO0VBQ0Usc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxVQUFBO0VBQ0EsNEJBQUE7QUFERjs7QUFHQTtFQUFvQiwyQkFBQTtBQUNwQiIsImZpbGUiOiJsYW5kaW5nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3QgeyBkaXNwbGF5OiBibG9jazsgfVxuXG4ubGFuZGluZyB7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAzcmVtO1xuICBwYWRkaW5nOiAycmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6XG4gICAgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgdG9wLCByZ2JhKDE3NywgMTM4LCAyNTUsIDAuMTUpLCB0cmFuc3BhcmVudCA2MCUpLFxuICAgIHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IGJvdHRvbSwgcmdiYSg3NiwgMjAxLCAyNDAsIDAuMTUpLCB0cmFuc3BhcmVudCA2MCUpLFxuICAgIHZhcigtLWJnLWRlZXApO1xufVxuXG4uYmctZ2xvdyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaW5zZXQ6IDA7XG4gIGJhY2tncm91bmQtaW1hZ2U6XG4gICAgcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudChcbiAgICAgIDQ1ZGVnLFxuICAgICAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSAwLFxuICAgICAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSAycHgsXG4gICAgICB0cmFuc3BhcmVudCAycHgsXG4gICAgICB0cmFuc3BhcmVudCAyMnB4XG4gICAgKTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi50aXRsZS1ibG9jayB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgei1pbmRleDogMTtcbn1cblxuLnRpdGxlIHtcbiAgZm9udC1mYW1pbHk6ICdCZWxlcmVuJywgJ1JvYm90bycsIHNlcmlmO1xuICBmb250LXNpemU6IGNsYW1wKDNyZW0sIDEwdncsIDZyZW0pO1xuICBmb250LXdlaWdodDogNDAwO1xuICBsZXR0ZXItc3BhY2luZzogMC4wNGVtO1xuICBsaW5lLWhlaWdodDogMS4yNTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwLjE1ZW0gMC4wNWVtO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmZmQxNjYgMCUsICNlZjQ3NmYgNTAlLCAjYjE4YWZmIDEwMCUpO1xuICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDtcbiAgYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xuICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDRweCAyMHB4IHJnYmEoMjU1LCAyMDksIDEwMiwgMC4zNSkpO1xuICBhbmltYXRpb246IGZsb2F0IDRzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xufVxuXG5Aa2V5ZnJhbWVzIGZsb2F0IHtcbiAgMCUsIDEwMCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH1cbiAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02cHgpOyB9XG59XG5cbi50YWdsaW5lIHtcbiAgZm9udC1zaXplOiAxLjFyZW07XG4gIGNvbG9yOiB2YXIoLS10ZXh0LWRpbSk7XG4gIG1hcmdpbjogMC43NXJlbSAwIDA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA0ZW07XG59XG5cbi5jdGEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDFyZW07XG4gIHotaW5kZXg6IDE7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDM2MHB4O1xufVxuLmN0YSAuc2ItYnV0dG9uIHsgd2lkdGg6IDEwMCU7IH1cblxuLmNsb3VkLWxpbmsge1xuICBjb2xvcjogdmFyKC0tdGV4dC1kaW0pO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcbiAgei1pbmRleDogMTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMTIwbXMgZWFzZTtcbn1cbi5jbG91ZC1saW5rOmhvdmVyIHsgY29sb3I6IHZhcigtLWFjY2VudC15ZWxsb3cpOyB9XG4iXX0= */"] });


/***/ }),

/***/ 3500:
/*!**************************************************!*\
  !*** ./src/app/pages/player/player.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerComponent": () => (/* binding */ PlayerComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 6078);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ 9698);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_web_socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/web-socket.service */ 4509);
/* harmony import */ var _services_identity_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/identity.service */ 9352);
/* harmony import */ var _services_game_state_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/game-state.service */ 382);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _components_token_avatar_token_avatar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/token-avatar/token-avatar.component */ 8462);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _components_token_picker_token_picker_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/token-picker/token-picker.component */ 2061);











function PlayerComponent_header_1_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "app-token-avatar", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tokenId", ctx_r5.myTokenId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r5.state.me.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"]((tmp_2_0 = ctx_r5.state.me.score) !== null && tmp_2_0 !== undefined ? tmp_2_0 : 0);
} }
function PlayerComponent_header_1_span_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("lobby", ctx_r6.state.phase === "lobby")("unknown", ctx_r6.state.phase === "unknown");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r6.state.phase === "unknown" ? "connecting" : ctx_r6.state.phase, " ");
} }
function PlayerComponent_header_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "header", 3)(1, "a", 4)(2, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "SUSSY ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "BINGO");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, PlayerComponent_header_1_div_6_Template, 6, 3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, PlayerComponent_header_1_span_7_Template, 2, 5, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.state.me && ctx_r0.state.phase === "live");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.state.phase !== "live");
} }
function PlayerComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 13)(2, "h1", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Welcome!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "What's your name?");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function PlayerComponent_ng_container_2_Template_input_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r7.nameInput = $event; })("keyup.enter", function PlayerComponent_ng_container_2_Template_input_keyup_enter_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r9.submitName(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function PlayerComponent_ng_container_2_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r10.submitName(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, " Join Game ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r1.nameInput);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", !ctx_r1.nameInput.trim());
} }
function PlayerComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "h2", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Connecting\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Joining the room");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} }
function PlayerComponent_ng_container_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h2", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Pick an avatar while we wait for the host.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("You're in, ", ctx_r11.state.me == null ? null : ctx_r11.state.me.name, "!");
} }
function PlayerComponent_ng_container_4_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h2", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Okay, hang tight\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Waiting for the host to start the game.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function PlayerComponent_ng_container_4_app_token_picker_5_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "app-token-picker", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("pick", function PlayerComponent_ng_container_4_app_token_picker_5_Template_app_token_picker_pick_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r15.onPickToken($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("myPlayerId", ctx_r14.state.me.playerId)("players", ctx_r14.state.players);
} }
function PlayerComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, PlayerComponent_ng_container_4_ng_container_2_Template, 5, 1, "ng-container", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, PlayerComponent_ng_container_4_ng_template_3_Template, 4, 0, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, PlayerComponent_ng_container_4_app_token_picker_5_Template, 1, 2, "app-token-picker", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](4);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r3.myTokenId)("ngIfElse", _r12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.state.me);
} }
function PlayerComponent_ng_container_5_div_1_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function PlayerComponent_ng_container_5_div_1_button_9_Template_button_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r27); const a_r24 = restoredCtx.$implicit; const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3); return ctx_r26.onChipTap(a_r24); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const a_r24 = ctx.$implicit;
    const i_r25 = ctx.index;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleProp"]("animation-delay", 60 + i_r25 * 55, "ms");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("highlighted", !ctx_r23.isRevealed && ctx_r23.highlightedName === a_r24)("locked", ctx_r23.state.yourGuess === a_r24 && !ctx_r23.isRevealed)("is-truth", ctx_r23.isRevealed && ctx_r23.state.lastReveal.truth === a_r24)("is-wrong", ctx_r23.isRevealed && ctx_r23.state.lastReveal.truth !== a_r24 && ctx_r23.state.yourGuess === a_r24)("is-dim", ctx_r23.isRevealed && ctx_r23.state.lastReveal.truth !== a_r24 && ctx_r23.state.yourGuess !== a_r24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](a_r24);
} }
function PlayerComponent_ng_container_5_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 35)(1, "div", 36)(2, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Tap name to filter");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "blockquote");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, PlayerComponent_ng_container_5_div_1_button_9_Template, 2, 13, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const q_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Quote #", q_r22.index, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("\"", q_r22.quote, "\"");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", q_r22.possibleAnswers);
} }
function PlayerComponent_ng_container_5_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Waiting for the next quote\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} }
function PlayerComponent_ng_container_5_div_4_button_1_app_token_avatar_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "app-token-avatar", 50);
} if (rf & 2) {
    const p_r34 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleProp"]("--chip-ox", p_r34.ox, "px")("--chip-oy", p_r34.oy, "px")("--chip-rot", p_r34.rot, "deg");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("sticky", p_r34.sticky);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tokenId", p_r34.tokenId);
} }
function PlayerComponent_ng_container_5_div_4_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function PlayerComponent_ng_container_5_div_4_button_1_Template_button_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r37); const cIdx_r32 = restoredCtx.index; const name_r31 = restoredCtx.$implicit; const rIdx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().index; const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r35.onSquareTap(rIdx_r29, cIdx_r32, name_r31); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, PlayerComponent_ng_container_5_div_4_button_1_app_token_avatar_4_Template, 1, 9, "app-token-avatar", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const name_r31 = ctx.$implicit;
    const cIdx_r32 = ctx.index;
    const rIdx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().index;
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("unavailable", !ctx_r30.isAvailable(name_r31))("you-guessed", ctx_r30.isCurrentPick(rIdx_r29, cIdx_r32) && !ctx_r30.state.lastReveal)("correct", ctx_r30.markFor(rIdx_r29, cIdx_r32) === "correct")("incorrect", ctx_r30.markFor(rIdx_r29, cIdx_r32) === "incorrect")("is-truth", (ctx_r30.state.lastReveal == null ? null : ctx_r30.state.lastReveal.truth) === name_r31 && (ctx_r30.state.lastReveal == null ? null : ctx_r30.state.lastReveal.index) === (ctx_r30.state.currentQuote == null ? null : ctx_r30.state.currentQuote.index))("highlighted", ctx_r30.highlightedName === name_r31)("winning-line", ctx_r30.isOnWinningLine(rIdx_r29, cIdx_r32));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](name_r31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r30.placementsAt(rIdx_r29, cIdx_r32))("ngForTrackBy", ctx_r30.trackPlacement);
} }
function PlayerComponent_ng_container_5_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, PlayerComponent_ng_container_5_div_4_button_1_Template, 5, 17, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r28 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", row_r28);
} }
function PlayerComponent_ng_container_5_div_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "\u2705 Nailed it!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} }
function PlayerComponent_ng_container_5_div_5_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "\u274C Nope");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} }
function PlayerComponent_ng_container_5_div_5_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "\u23F3 Missed it");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} }
function PlayerComponent_ng_container_5_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, PlayerComponent_ng_container_5_div_5_ng_container_1_Template, 2, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, PlayerComponent_ng_container_5_div_5_ng_container_2_Template, 2, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, PlayerComponent_ng_container_5_div_5_ng_container_3_Template, 2, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "It was ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("win", ctx_r20.state.lastReveal.truth === ctx_r20.state.yourGuess)("lose", ctx_r20.state.lastReveal.truth !== ctx_r20.state.yourGuess && ctx_r20.state.yourGuess);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r20.state.lastReveal.truth === ctx_r20.state.yourGuess);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r20.state.lastReveal.truth !== ctx_r20.state.yourGuess && ctx_r20.state.yourGuess);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r20.state.yourGuess);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r20.state.lastReveal.truth);
} }
function PlayerComponent_ng_container_5_div_6_ng_container_4_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "You got 5 in a row!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} }
function PlayerComponent_ng_container_5_div_6_ng_container_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "You tied it up!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} }
function PlayerComponent_ng_container_5_div_6_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, PlayerComponent_ng_container_5_div_6_ng_container_4_ng_container_1_Template, 2, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, PlayerComponent_ng_container_5_div_6_ng_container_4_ng_container_2_Template, 2, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r42.state.bingoWinners.length === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r42.state.bingoWinners.length > 1);
} }
function PlayerComponent_ng_container_5_div_6_ng_template_5_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " got 5 in a row. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r48.state.bingoWinners[0].name);
} }
function PlayerComponent_ng_container_5_div_6_ng_template_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " tied with 5 in a row. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", ctx_r49.state.bingoWinners.length, " players");
} }
function PlayerComponent_ng_container_5_div_6_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, PlayerComponent_ng_container_5_div_6_ng_template_5_ng_container_0_Template, 4, 1, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, PlayerComponent_ng_container_5_div_6_ng_template_5_ng_container_1_Template, 4, 1, "ng-container", 2);
} if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r44.state.bingoWinners.length === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r44.state.bingoWinners.length > 1);
} }
function PlayerComponent_ng_container_5_div_6_li_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "app-token-avatar", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const w_r50 = ctx.$implicit;
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("tokenId", ctx_r45.tokenIdFor(w_r50.playerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](w_r50.name);
} }
function PlayerComponent_ng_container_5_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 53)(1, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "BINGO!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, PlayerComponent_ng_container_5_div_6_ng_container_4_Template, 3, 2, "ng-container", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, PlayerComponent_ng_container_5_div_6_ng_template_5_Template, 2, 2, "ng-template", null, 56, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "ul", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, PlayerComponent_ng_container_5_div_6_li_8_Template, 4, 2, "li", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](6);
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("mine", ctx_r21.amIBingoWinner);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r21.amIBingoWinner)("ngIfElse", _r43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r21.state.bingoWinners);
} }
const _c0 = function (a0) { return [a0]; };
const _c1 = function () { return []; };
function PlayerComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, PlayerComponent_ng_container_5_div_1_Template, 10, 3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, PlayerComponent_ng_container_5_div_2_Template, 4, 0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, PlayerComponent_ng_container_5_div_4_Template, 2, 1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, PlayerComponent_ng_container_5_div_5_Template, 8, 8, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, PlayerComponent_ng_container_5_div_6_Template, 9, 5, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r4.state.currentQuote ? _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c0, ctx_r4.state.currentQuote) : _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](8, _c1))("ngForTrackBy", ctx_r4.trackQuoteIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r4.state.currentQuote);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r4.state.card);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r4.state.lastReveal && !(ctx_r4.state.bingoWinners == null ? null : ctx_r4.state.bingoWinners.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r4.state.bingoWinners == null ? null : ctx_r4.state.bingoWinners.length);
} }
class PlayerComponent {
    constructor(ws, identity, game) {
        this.ws = ws;
        this.identity = identity;
        this.game = game;
        this.needsName = false;
        this.nameInput = '';
        this.backgroundUrl = '';
        /** Cell the player tapped for the current open quote, or null if untapped. */
        this.currentPick = null;
        /** Permanent per-cell outcome history keyed by "r,c". */
        this.cellMarks = new Map();
        /** Past correct placements by OTHER players, kept as ghost chips on this card.
         *  Key: "playerId@row,col" — a player can have multiple sticky chips across rounds. */
        this.stickyCorrect = new Map();
        /** Name from the quote's possible-answer chips the player tapped to spotlight on the board. */
        this.highlightedName = null;
        this.lastSeenRevealIndex = null;
        this.lastSeenQuoteIndex = null;
        this.sub = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subscription();
        this.state = game.snapshot();
    }
    get myTokenId() {
        var _a, _b, _c;
        const meId = (_a = this.state.me) === null || _a === void 0 ? void 0 : _a.playerId;
        if (!meId)
            return null;
        return (_c = (_b = this.state.players.find(p => p.playerId === meId)) === null || _b === void 0 ? void 0 : _b.tokenId) !== null && _c !== void 0 ? _c : null;
    }
    /** True once the host has revealed the answer to the currently displayed quote. */
    get isRevealed() {
        var _a;
        const r = this.state.lastReveal;
        return !!r && r.index === ((_a = this.state.currentQuote) === null || _a === void 0 ? void 0 : _a.index);
    }
    ngOnInit() {
        this.backgroundUrl = this.pickBackground();
        this.ws.onReconnect = () => this.rejoin();
        this.ws.connect(_config__WEBPACK_IMPORTED_MODULE_0__.WS_URL);
        this.sub.add(this.ws.messages$.subscribe(msg => this.game.apply(msg)));
        const cached = this.identity.snapshot();
        if (cached) {
            this.ws.send({ type: 'join', name: cached.name, playerId: cached.playerId });
        }
        else {
            this.needsName = true;
        }
        this.sub.add(this.game.state$.subscribe(s => {
            var _a, _b, _c, _d;
            const wasMe = this.state.me;
            const wasCard = this.state.card;
            this.state = s;
            if (s.me && !this.identity.snapshot()) {
                this.identity.save({ playerId: s.me.playerId, name: s.me.name, cardId: s.me.cardId });
            }
            else if (s.me && ((_a = this.identity.snapshot()) === null || _a === void 0 ? void 0 : _a.cardId) !== s.me.cardId) {
                this.identity.save({ playerId: s.me.playerId, name: s.me.name, cardId: s.me.cardId });
            }
            else if (wasMe && !s.me) {
                // Host cleared the lobby. Force the player back to the name-entry screen.
                this.identity.clear();
                this.needsName = true;
                this.nameInput = '';
            }
            // Reset cell marks whenever a fresh card arrives (new game / new round).
            if (s.card !== wasCard) {
                this.cellMarks.clear();
                this.stickyCorrect.clear();
                this.currentPick = null;
                this.lastSeenQuoteIndex = null;
                this.lastSeenRevealIndex = null;
            }
            // Clear the pending pick and any highlight when the host moves to a new quote.
            if (s.currentQuote && s.currentQuote.index !== this.lastSeenQuoteIndex) {
                this.lastSeenQuoteIndex = s.currentQuote.index;
                this.currentPick = null;
                this.highlightedName = null;
            }
            // On a fresh reveal, freeze a CORRECT pick into a permanent green mark.
            // Wrong picks leave no trace — the chip clears and the cell stays
            // tappable for a future round.
            if (s.lastReveal && s.lastReveal.index !== this.lastSeenRevealIndex) {
                this.lastSeenRevealIndex = s.lastReveal.index;
                if (this.currentPick && s.card) {
                    const pickedName = (_b = s.card[this.currentPick.row]) === null || _b === void 0 ? void 0 : _b[this.currentPick.col];
                    if (pickedName === s.lastReveal.truth) {
                        this.cellMarks.set(`${this.currentPick.row},${this.currentPick.col}`, 'correct');
                    }
                }
                // Snapshot every OTHER player's correct placement so their chip
                // lingers on my board at reduced opacity even after the round ends.
                for (const p of s.lastReveal.perPlayer) {
                    if (!p.correct)
                        continue;
                    if (p.playerId === ((_c = s.me) === null || _c === void 0 ? void 0 : _c.playerId))
                        continue;
                    const placement = (_d = s.placements) === null || _d === void 0 ? void 0 : _d[p.playerId];
                    if (!placement)
                        continue;
                    this.stickyCorrect.set(`${p.playerId}@${placement.row},${placement.col}`, { playerId: p.playerId, row: placement.row, col: placement.col });
                }
            }
        }));
    }
    submitName() {
        if (!this.nameInput.trim())
            return;
        this.ws.send({ type: 'join', name: this.nameInput.trim() });
        this.needsName = false;
    }
    onSquareTap(row, col, name) {
        var _a;
        if ((_a = this.state.bingoWinners) === null || _a === void 0 ? void 0 : _a.length)
            return; // game decided — board frozen
        if (!this.state.currentQuote)
            return;
        if (this.state.lastReveal && this.state.lastReveal.index === this.state.currentQuote.index)
            return;
        if (this.cellMarks.has(`${row},${col}`))
            return;
        this.currentPick = { row, col };
        this.ws.send({ type: 'guess', quoteIndex: this.state.currentQuote.index, guess: name, row, col });
    }
    /** True if I'm one of the bingo co-winners. */
    get amIBingoWinner() {
        var _a;
        return !!((_a = this.state.bingoWinners) === null || _a === void 0 ? void 0 : _a.some(w => { var _a; return w.playerId === ((_a = this.state.me) === null || _a === void 0 ? void 0 : _a.playerId); }));
    }
    /** Cells in my winning line, for grid highlighting. */
    get myWinningLine() {
        var _a, _b;
        const me = (_a = this.state.bingoWinners) === null || _a === void 0 ? void 0 : _a.find(w => { var _a; return w.playerId === ((_a = this.state.me) === null || _a === void 0 ? void 0 : _a.playerId); });
        return new Set(((_b = me === null || me === void 0 ? void 0 : me.line) !== null && _b !== void 0 ? _b : []).map(([r, c]) => `${r},${c}`));
    }
    isOnWinningLine(row, col) {
        return this.myWinningLine.has(`${row},${col}`);
    }
    tokenIdFor(playerId) {
        var _a, _b;
        return (_b = (_a = this.state.players.find(p => p.playerId === playerId)) === null || _a === void 0 ? void 0 : _a.tokenId) !== null && _b !== void 0 ? _b : null;
    }
    placementsAt(row, col) {
        var _a, _b, _c, _d, _e;
        const out = [];
        const seen = new Set();
        // Live placements first (full opacity).
        for (const playerId of Object.keys((_a = this.state.placements) !== null && _a !== void 0 ? _a : {})) {
            const pos = this.state.placements[playerId];
            if (pos.row !== row || pos.col !== col)
                continue;
            seen.add(playerId);
            const tokenId = (_c = (_b = this.state.players.find(p => p.playerId === playerId)) === null || _b === void 0 ? void 0 : _b.tokenId) !== null && _c !== void 0 ? _c : null;
            const scatter = this.chipScatter(playerId, row, col);
            out.push(Object.assign(Object.assign({ playerId, tokenId }, scatter), { sticky: false }));
        }
        // Sticky chips from past correct rounds (reduced opacity), skipping any
        // player who already has a live chip at this cell to avoid double-rendering.
        for (const entry of this.stickyCorrect.values()) {
            if (entry.row !== row || entry.col !== col)
                continue;
            if (seen.has(entry.playerId))
                continue;
            const tokenId = (_e = (_d = this.state.players.find(p => p.playerId === entry.playerId)) === null || _d === void 0 ? void 0 : _d.tokenId) !== null && _e !== void 0 ? _e : null;
            const scatter = this.chipScatter(entry.playerId, row, col);
            out.push(Object.assign(Object.assign({ playerId: entry.playerId, tokenId }, scatter), { sticky: true }));
        }
        return out;
    }
    /**
     * Deterministic per-(player, cell) scatter so chips land in the same spot on
     * re-render and chips dropped by different players on the same cell don't
     * stack perfectly on top of each other.
     *
     * Polar placement biased to the top/bottom of the cell: chips fall in a
     * 60°-wide arc centered on the vertical axis (top half OR bottom half),
     * leaving the horizontal band clear so the name stays readable.
     */
    chipScatter(playerId, row, col) {
        const key = `${playerId}#${row},${col}`;
        let h = 0;
        for (let i = 0; i < key.length; i++)
            h = (h * 31 + key.charCodeAt(i)) | 0;
        const arcSpan = Math.PI / 3; // 60° wide arc
        const arcPos = (h & 0xff) / 255; // 0..1 within the arc
        const isTop = (((h >> 24) ^ (h >> 30)) & 1) === 0; // pick top vs bottom from hash
        // Top arc:    angles -2π/3 .. -π/3  (centered on -π/2 / cell top)
        // Bottom arc: angles  π/3 .. 2π/3   (centered on  π/2 / cell bottom)
        const arcStart = isTop
            ? -Math.PI / 2 - arcSpan / 2
            : Math.PI / 2 - arcSpan / 2;
        const angle = arcStart + arcPos * arcSpan;
        const radius = 18 + (((h >> 8) & 0xff) / 255) * 6; // 18..24 px
        const ox = +(Math.cos(angle) * radius).toFixed(1);
        const oy = +(Math.sin(angle) * radius).toFixed(1);
        const rot = +((((h >> 16) & 0xff) / 255 - 0.5) * 50).toFixed(1); // -25..+25 deg
        return { ox, oy, rot };
    }
    trackPlacement(_, p) { return p.playerId; }
    trackQuoteIndex(_, q) { return q.index; }
    /** True if the cell's name is one of the current quote's four possible answers. */
    isAvailable(name) {
        var _a;
        const possible = (_a = this.state.currentQuote) === null || _a === void 0 ? void 0 : _a.possibleAnswers;
        if (!possible)
            return true;
        return possible.includes(name);
    }
    markFor(row, col) {
        var _a;
        return (_a = this.cellMarks.get(`${row},${col}`)) !== null && _a !== void 0 ? _a : null;
    }
    isCurrentPick(row, col) {
        var _a, _b;
        return ((_a = this.currentPick) === null || _a === void 0 ? void 0 : _a.row) === row && ((_b = this.currentPick) === null || _b === void 0 ? void 0 : _b.col) === col;
    }
    onChipTap(name) {
        this.highlightedName = this.highlightedName === name ? null : name;
    }
    onPickToken(tokenId) {
        this.ws.send({ type: 'pick_token', tokenId });
    }
    trackPlayerId(_, p) { return p.playerId; }
    rejoin() {
        const cached = this.identity.snapshot();
        if (cached)
            this.ws.send({ type: 'join', name: cached.name, playerId: cached.playerId });
    }
    pickBackground() {
        const roll = Math.floor(Math.random() * 21);
        const name = roll === 20 ? 'wastes' : PlayerComponent.LANDS[roll % PlayerComponent.LANDS.length];
        return `assets/backgrounds/${name}.png`;
    }
    ngOnDestroy() { this.sub.unsubscribe(); }
}
PlayerComponent.LANDS = ['forest', 'island', 'mountain', 'plains', 'swamp'];
PlayerComponent.ɵfac = function PlayerComponent_Factory(t) { return new (t || PlayerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_web_socket_service__WEBPACK_IMPORTED_MODULE_1__.WebSocketService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_identity_service__WEBPACK_IMPORTED_MODULE_2__.IdentityService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_game_state_service__WEBPACK_IMPORTED_MODULE_3__.GameStateService)); };
PlayerComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: PlayerComponent, selectors: [["app-player"]], decls: 6, vars: 5, consts: [[1, "player"], ["class", "hdr", 4, "ngIf"], [4, "ngIf"], [1, "hdr"], ["routerLink", "/", 1, "brand-link"], [1, "brand"], ["class", "me-badge", 4, "ngIf"], ["class", "sb-pill", 3, "lobby", "unknown", 4, "ngIf"], [1, "me-badge"], ["size", "sm", 3, "tokenId"], [1, "me-name"], [1, "me-score"], [1, "sb-pill"], [1, "name-card", "sb-card"], [1, "welcome"], [1, "welcome-sub"], ["placeholder", "Type your name", "autofocus", "", 1, "name-input", 3, "ngModel", "ngModelChange", "keyup.enter"], [1, "sb-button", "primary", "full", 3, "disabled", "click"], [1, "connecting", "sb-card"], [1, "spinner"], [1, "connecting-title"], [1, "connecting-sub"], [1, "lobby", "sb-card"], [4, "ngIf", "ngIfElse"], ["picked", ""], [3, "myPlayerId", "players", "pick", 4, "ngIf"], [1, "lobby-title"], [1, "lobby-sub"], [3, "myPlayerId", "players", "pick"], ["class", "quote-area sb-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "waiting-card sb-card", 4, "ngIf"], [1, "card-grid"], ["class", "row", 4, "ngFor", "ngForOf"], ["class", "reveal-banner", 3, "win", "lose", 4, "ngIf"], ["class", "bingo-banner sb-card", 3, "mine", 4, "ngIf"], [1, "quote-area", "sb-card"], [1, "quote-header"], [1, "quote-index"], [1, "quote-hint"], [1, "possibles"], ["type", "button", "class", "possible-chip", 3, "animation-delay", "highlighted", "locked", "is-truth", "is-wrong", "is-dim", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "possible-chip", 3, "click"], [1, "waiting-card", "sb-card"], [1, "waiting-dot"], [1, "row"], ["class", "cell", 3, "unavailable", "you-guessed", "correct", "incorrect", "is-truth", "highlighted", "winning-line", "click", 4, "ngFor", "ngForOf"], [1, "cell", 3, "click"], [1, "cell-name"], [1, "placements"], ["class", "dropped", "size", "sm", 3, "sticky", "tokenId", "--chip-ox", "--chip-oy", "--chip-rot", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["size", "sm", 1, "dropped", 3, "tokenId"], [1, "reveal-banner"], [1, "reveal-truth"], [1, "bingo-banner", "sb-card"], [1, "bingo-headline"], [1, "bingo-sub"], ["otherWinner", ""], [1, "bingo-winners"], [4, "ngFor", "ngForOf"]], template: function PlayerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, PlayerComponent_header_1_Template, 8, 2, "header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, PlayerComponent_ng_container_2_Template, 9, 2, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, PlayerComponent_ng_container_3_Template, 7, 0, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, PlayerComponent_ng_container_4_Template, 6, 3, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, PlayerComponent_ng_container_5_Template, 7, 9, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.needsName);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.needsName);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.needsName && ctx.state.phase === "unknown");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.needsName && ctx.state.phase === "lobby");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.needsName && ctx.state.phase === "live" && ctx.state.card);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLinkWithHref, _components_token_avatar_token_avatar_component__WEBPACK_IMPORTED_MODULE_4__.TokenAvatarComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _components_token_picker_token_picker_component__WEBPACK_IMPORTED_MODULE_5__.TokenPickerComponent, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf], styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  \n  --paper: #fffaee;\n  --paper-warm: #fff1d0;\n  --ink: #1a1330;\n  --tile: #ffffff;\n}\n.player[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding: 1rem;\n  \n  background: repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0 14px, transparent 14px 28px), radial-gradient(circle at top right, rgba(255, 209, 102, 0.4), transparent 55%), radial-gradient(circle at bottom left, rgba(76, 201, 240, 0.35), transparent 55%), linear-gradient(160deg, #ff8c42, #ef476f 45%, #b18aff);\n  background-attachment: fixed;\n  color: var(--ink);\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n.player[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 540px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.player[_ngcontent-%COMP%]   .sb-card[_ngcontent-%COMP%] {\n  background: var(--paper);\n  color: var(--ink);\n  border: 3px solid var(--ink);\n  border-radius: 18px;\n  box-shadow: 0 6px 0 var(--ink), 0 14px 28px rgba(0, 0, 0, 0.3);\n}\n.player[_ngcontent-%COMP%]   .sb-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--ink);\n}\n.hdr[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.25rem 0 1rem;\n  gap: 0.5rem;\n}\n\n.me-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.25rem 0.75rem 0.25rem 0.3rem;\n  background: var(--paper);\n  border: 3px solid var(--ink);\n  border-radius: 999px;\n  box-shadow: 0 3px 0 var(--ink);\n  font-family: \"Caveat\", cursive;\n  font-weight: 700;\n  color: var(--ink);\n}\n.me-name[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  line-height: 1;\n}\n.me-score[_ngcontent-%COMP%] {\n  background: var(--accent-yellow);\n  color: var(--ink);\n  border: 2px solid var(--ink);\n  border-radius: 999px;\n  padding: 0 0.5rem;\n  font-size: 1.15rem;\n  line-height: 1.3;\n  min-width: 1.4em;\n  text-align: center;\n  font-variant-numeric: tabular-nums;\n}\n.me-badge[_ngcontent-%COMP%]     .avatar.size-sm {\n  width: 26px;\n  height: 26px;\n  outline: 2px solid var(--ink);\n  outline-offset: -2px;\n}\n.brand-link[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n.brand[_ngcontent-%COMP%] {\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  color: var(--accent-yellow);\n  font-size: 1.5rem;\n  cursor: pointer;\n  text-shadow: -1px -1px 0 var(--ink), 1px -1px 0 var(--ink), -1px 1px 0 var(--ink), 1px 1px 0 var(--ink);\n}\n.brand[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--accent-purple);\n}\n.welcome[_ngcontent-%COMP%], .lobby-title[_ngcontent-%COMP%] {\n  font-family: \"Beleren\", \"Roboto\", serif;\n  font-weight: 400;\n}\n\n.name-card[_ngcontent-%COMP%] {\n  padding: 2rem 1.5rem;\n  margin-top: 4rem;\n  text-align: center;\n}\n.welcome[_ngcontent-%COMP%] {\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-size: 2.6rem;\n  font-weight: 400;\n  margin: 0;\n  color: var(--ink);\n  letter-spacing: 0.01em;\n}\n.welcome-sub[_ngcontent-%COMP%] {\n  color: var(--ink);\n  opacity: 0.7;\n  margin: 0.5rem 0 1.5rem;\n}\n.name-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1rem 1.25rem;\n  font-size: 1.3rem;\n  background: var(--tile);\n  border: 3px solid var(--ink);\n  border-radius: 12px;\n  color: var(--ink);\n  outline: none;\n  margin-bottom: 1rem;\n  transition: border-color 120ms ease, box-shadow 120ms ease;\n  font-family: \"Caveat\", cursive;\n  font-weight: 700;\n}\n.name-input[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px var(--accent-yellow);\n}\n.name-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--ink);\n  opacity: 0.4;\n}\n.sb-button.full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.connecting[_ngcontent-%COMP%] {\n  padding: 2.5rem 1.5rem;\n  margin-top: 4rem;\n  text-align: center;\n}\n.connecting-title[_ngcontent-%COMP%] {\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-weight: 400;\n  font-size: 1.8rem;\n  color: var(--ink);\n  margin: 0.75rem 0 0.25rem;\n}\n.connecting-sub[_ngcontent-%COMP%] {\n  color: var(--ink);\n  opacity: 0.7;\n  margin: 0;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  margin: 0 auto;\n  border: 4px solid var(--border);\n  border-top-color: var(--accent-yellow);\n  border-radius: 50%;\n  animation: spin 800ms linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.lobby[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.lobby-title[_ngcontent-%COMP%] {\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-size: 2rem;\n  font-weight: 400;\n  margin: 0;\n  color: var(--ink);\n  letter-spacing: 0.01em;\n}\n.lobby-sub[_ngcontent-%COMP%] {\n  color: var(--ink);\n  opacity: 0.7;\n  margin: 0.3rem 0 1.25rem;\n}\n.lobby-divider[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  color: var(--text-dim);\n  border-top: 1px solid var(--border);\n  padding-top: 0.75rem;\n  margin-bottom: 0.5rem;\n}\n.lobby-players[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.lobby-players[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 0.6rem 0.9rem;\n  background: var(--bg-card-2);\n  border-radius: 8px;\n  margin-bottom: 0.4rem;\n}\n.lobby-players[_ngcontent-%COMP%]   li.you[_ngcontent-%COMP%] {\n  background: rgba(255, 209, 102, 0.15);\n  border: 1px solid var(--accent-yellow);\n  font-weight: 700;\n}\n\n.quote-area[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem;\n  margin-bottom: 1rem;\n  animation: quote-in 380ms cubic-bezier(0.34, 1.56, 0.64, 1);\n  transform-origin: center top;\n}\n@keyframes quote-in {\n  0% {\n    opacity: 0;\n    transform: translateY(14px) scale(0.96);\n  }\n  60% {\n    opacity: 1;\n    transform: translateY(-3px) scale(1.02);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@keyframes quote-text-in {\n  0% {\n    opacity: 0;\n    transform: translateX(-10px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@keyframes chip-in {\n  0% {\n    opacity: 0;\n    transform: translateY(8px) scale(0.85);\n  }\n  70% {\n    opacity: 1;\n    transform: translateY(-1px) scale(1.04);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.quote-area[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  animation: quote-text-in 320ms ease-out both;\n  animation-delay: 80ms;\n}\n.possible-chip[_ngcontent-%COMP%] {\n  animation: chip-in 320ms cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n.quote-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  gap: 0.5rem;\n}\n.quote-index[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  color: var(--ink);\n  opacity: 0.55;\n  font-weight: 700;\n}\n.quote-hint[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--ink);\n  opacity: 0.45;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.quote-area[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  line-height: 1.35;\n  margin: 0.6rem 0;\n  padding-left: 0.75rem;\n  border-left: 6px solid var(--accent-yellow);\n  color: var(--ink);\n  font-weight: 600;\n}\n.possibles[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 0.9rem;\n}\n.possible-chip[_ngcontent-%COMP%] {\n  background: var(--tile);\n  color: var(--ink);\n  padding: 0.45rem 0.95rem;\n  border-radius: 999px;\n  font-family: \"Caveat\", cursive;\n  font-size: 1.3rem;\n  font-weight: 700;\n  border: 3px solid var(--ink);\n  box-shadow: 0 3px 0 var(--ink);\n  cursor: pointer;\n  transition: background 150ms ease, transform 80ms ease, box-shadow 80ms ease, translate 80ms ease;\n  line-height: 1;\n}\n.possible-chip[_ngcontent-%COMP%]:active {\n  translate: 0 2px;\n  box-shadow: 0 1px 0 var(--ink);\n}\n.possible-chip.highlighted[_ngcontent-%COMP%]:not(.locked) {\n  background: var(--accent-yellow);\n}\n.possible-chip.locked[_ngcontent-%COMP%] {\n  background: var(--accent-green);\n  color: var(--ink);\n  box-shadow: 0 3px 0 var(--ink), 0 0 0 3px rgba(6, 214, 160, 0.4);\n}\n.possible-chip.locked[_ngcontent-%COMP%]::before {\n  content: \"\u2713\";\n  margin-right: 0.25rem;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 800;\n}\n\n.possible-chip.is-truth[_ngcontent-%COMP%] {\n  background: var(--accent-green);\n  color: var(--ink);\n  box-shadow: 0 3px 0 var(--ink), 0 0 0 4px rgba(6, 214, 160, 0.45);\n  animation: chip-truth-pop 620ms cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.possible-chip.is-truth[_ngcontent-%COMP%]::before {\n  content: \"\u2713\";\n  margin-right: 0.3rem;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 800;\n}\n.possible-chip.is-wrong[_ngcontent-%COMP%] {\n  background: var(--accent-red);\n  color: var(--ink);\n  box-shadow: 0 3px 0 var(--ink), 0 0 0 4px rgba(239, 71, 111, 0.4);\n  animation: chip-wrong-shake 400ms ease-out;\n}\n.possible-chip.is-wrong[_ngcontent-%COMP%]::before {\n  content: \"\u2717\";\n  margin-right: 0.3rem;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 800;\n}\n.possible-chip.is-dim[_ngcontent-%COMP%] {\n  opacity: 0.55;\n  filter: grayscale(0.4);\n  pointer-events: none;\n}\n@keyframes chip-truth-pop {\n  0% {\n    transform: scale(1);\n  }\n  35% {\n    transform: scale(1.12) rotate(-2deg);\n  }\n  60% {\n    transform: scale(0.97) rotate(1deg);\n  }\n  100% {\n    transform: scale(1) rotate(0);\n  }\n}\n@keyframes chip-wrong-shake {\n  0%, 100% {\n    transform: translateX(0);\n  }\n  20% {\n    transform: translateX(-4px) rotate(-2deg);\n  }\n  40% {\n    transform: translateX(4px) rotate(2deg);\n  }\n  60% {\n    transform: translateX(-2px) rotate(-1deg);\n  }\n  80% {\n    transform: translateX(2px) rotate(1deg);\n  }\n}\n\n.card-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 1rem;\n  \n  max-width: none !important;\n  width: 100%;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.cell[_ngcontent-%COMP%] {\n  --tilt: 0deg;\n  flex: 1 1 0;\n  min-width: 0;\n  aspect-ratio: 1;\n  font-family: \"Caveat\", cursive;\n  font-size: clamp(0.95rem, 3vw, 1.35rem);\n  font-weight: 700;\n  letter-spacing: 0.01em;\n  padding: 0.2rem;\n  border: 3px solid var(--ink);\n  border-radius: 10px;\n  background: var(--tile);\n  color: var(--ink);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  transition: background 200ms ease, border-color 200ms ease, color 220ms ease, box-shadow 80ms ease, translate 80ms ease, scale 240ms cubic-bezier(0.34, 1.56, 0.64, 1);\n  position: relative;\n  overflow: hidden;\n  rotate: var(--tilt);\n  box-shadow: 0 4px 0 var(--ink);\n  line-height: 1;\n}\n.cell[_ngcontent-%COMP%]:active {\n  translate: 0 3px;\n  box-shadow: 0 1px 0 var(--ink);\n}\n\n.row[_ngcontent-%COMP%]:nth-child(odd)   .cell[_ngcontent-%COMP%]:nth-child(7n+1) {\n  --tilt: -0.8deg;\n}\n.row[_ngcontent-%COMP%]:nth-child(odd)   .cell[_ngcontent-%COMP%]:nth-child(7n+3) {\n  --tilt: 1.2deg;\n}\n.row[_ngcontent-%COMP%]:nth-child(odd)   .cell[_ngcontent-%COMP%]:nth-child(7n+5) {\n  --tilt: -0.6deg;\n}\n.row[_ngcontent-%COMP%]:nth-child(odd)   .cell[_ngcontent-%COMP%]:nth-child(7n+7) {\n  --tilt: 0.9deg;\n}\n.row[_ngcontent-%COMP%]:nth-child(even)   .cell[_ngcontent-%COMP%]:nth-child(7n+2) {\n  --tilt: 0.7deg;\n}\n.row[_ngcontent-%COMP%]:nth-child(even)   .cell[_ngcontent-%COMP%]:nth-child(7n+4) {\n  --tilt: -1.1deg;\n}\n.row[_ngcontent-%COMP%]:nth-child(even)   .cell[_ngcontent-%COMP%]:nth-child(7n+6) {\n  --tilt: 0.5deg;\n}\n.cell-name[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  pointer-events: none;\n}\n.placements[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 2;\n}\n.placements[_ngcontent-%COMP%]   .dropped[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  \n  display: block;\n  width: 26px;\n  height: 26px;\n  translate: calc(-50% + var(--chip-ox, 0px)) calc(-50% + var(--chip-oy, 0px));\n  rotate: var(--chip-rot, 0deg);\n  filter: drop-shadow(0 5px 4px rgba(0, 0, 0, 0.55));\n  animation: chip-drop 520ms cubic-bezier(0.22, 1.6, 0.36, 1) backwards;\n  transition: opacity 700ms ease-out, filter 700ms ease-out;\n  opacity: 1;\n}\n\n.placements[_ngcontent-%COMP%]   .dropped.sticky[_ngcontent-%COMP%] {\n  opacity: 0.2;\n  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.35));\n  z-index: 0;\n}\n\n.placements[_ngcontent-%COMP%]     .avatar.size-sm {\n  width: 26px;\n  height: 26px;\n  outline: 2px solid var(--ink);\n  outline-offset: -2px;\n}\n\n@keyframes chip-drop {\n  0% {\n    transform: scale(2.4);\n    opacity: 0;\n    filter: drop-shadow(0 5px 4px rgba(0, 0, 0, 0.55)) blur(6px);\n  }\n  55% {\n    transform: scale(1);\n    opacity: 1;\n    filter: drop-shadow(0 5px 4px rgba(0, 0, 0, 0.55)) blur(0);\n  }\n  68% {\n    transform: scale(0.92) rotate(3deg);\n  }\n  82% {\n    transform: scale(1.04) rotate(-2deg);\n  }\n  92% {\n    transform: scale(0.98) rotate(1deg);\n  }\n  100% {\n    transform: scale(1) rotate(0deg);\n  }\n}\n\n.bingo-banner[_ngcontent-%COMP%] {\n  padding: 1.4rem 1.25rem 1.2rem;\n  margin: 1rem 0;\n  text-align: center;\n  \n  animation: bingo-pop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 1100ms backwards;\n}\n.bingo-banner.mine[_ngcontent-%COMP%] {\n  background: var(--accent-yellow);\n  animation: bingo-pop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 1100ms backwards, bingo-shimmer 1.2s ease-in-out 1700ms infinite;\n}\n.bingo-headline[_ngcontent-%COMP%] {\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-size: 2.8rem;\n  line-height: 1;\n  color: var(--ink);\n  text-shadow: 0 3px 0 rgba(0, 0, 0, 0.15);\n}\n.bingo-sub[_ngcontent-%COMP%] {\n  font-family: \"Caveat\", cursive;\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: var(--ink);\n  margin-top: 0.5rem;\n}\n.bingo-winners[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0.9rem 0 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  justify-content: center;\n}\n.bingo-winners[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  background: var(--tile);\n  border: 2px solid var(--ink);\n  border-radius: 999px;\n  padding: 0.2rem 0.75rem 0.2rem 0.25rem;\n  font-family: \"Caveat\", cursive;\n  font-weight: 700;\n  font-size: 1.05rem;\n  box-shadow: 0 2px 0 var(--ink);\n}\n.bingo-winners[_ngcontent-%COMP%]     .avatar.size-sm {\n  width: 24px;\n  height: 24px;\n  outline: 2px solid var(--ink);\n  outline-offset: -2px;\n}\n@keyframes bingo-pop {\n  0% {\n    transform: scale(0.5) rotate(-6deg);\n    opacity: 0;\n  }\n  60% {\n    transform: scale(1.08) rotate(2deg);\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1) rotate(0);\n    opacity: 1;\n  }\n}\n@keyframes bingo-shimmer {\n  0%, 100% {\n    box-shadow: 0 6px 0 var(--ink), 0 0 0 0 rgba(255, 209, 102, 0);\n  }\n  50% {\n    box-shadow: 0 6px 0 var(--ink), 0 0 0 14px rgba(255, 209, 102, 0.5);\n  }\n}\n\n.cell.winning-line[_ngcontent-%COMP%] {\n  box-shadow: 0 4px 0 var(--ink), 0 0 0 4px var(--accent-yellow);\n  z-index: 2;\n  animation: winline-pulse 1.4s ease-in-out infinite;\n}\n@keyframes winline-pulse {\n  0%, 100% {\n    box-shadow: 0 4px 0 var(--ink), 0 0 0 4px var(--accent-yellow);\n  }\n  50% {\n    box-shadow: 0 4px 0 var(--ink), 0 0 0 7px rgba(255, 209, 102, 0.85);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .placements[_ngcontent-%COMP%]   .dropped[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.cell.you-guessed[_ngcontent-%COMP%] {\n  background: var(--accent-yellow);\n  color: var(--ink);\n  animation: pulse 600ms ease-in-out infinite alternate;\n}\n@keyframes pulse {\n  from {\n    box-shadow: 0 4px 0 var(--ink), 0 0 0 0 rgba(255, 209, 102, 0.7);\n  }\n  to {\n    box-shadow: 0 4px 0 var(--ink), 0 0 0 10px rgba(255, 209, 102, 0);\n  }\n}\n.cell.correct[_ngcontent-%COMP%] {\n  background: var(--accent-green);\n  color: var(--ink);\n  animation: cell-correct-pop 700ms cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.cell.incorrect[_ngcontent-%COMP%] {\n  background: var(--accent-red);\n  color: var(--ink);\n  animation: cell-incorrect-shake 420ms cubic-bezier(0.36, 0.07, 0.19, 0.97);\n}\n@keyframes cell-correct-pop {\n  0% {\n    transform: scale(0.95);\n    box-shadow: 0 0 0 0 rgba(6, 214, 160, 0.9);\n  }\n  40% {\n    transform: scale(1.12);\n    box-shadow: 0 0 0 14px rgba(6, 214, 160, 0);\n  }\n  100% {\n    transform: scale(1);\n    box-shadow: 0 0 0 0 rgba(6, 214, 160, 0), 0 2px 0 rgba(0, 0, 0, 0.25);\n  }\n}\n@keyframes cell-incorrect-shake {\n  10%, 90% {\n    transform: translateX(-1px);\n  }\n  20%, 80% {\n    transform: translateX(2px);\n  }\n  30%, 50%, 70% {\n    transform: translateX(-3px);\n  }\n  40%, 60% {\n    transform: translateX(3px);\n  }\n}\n.cell.is-truth[_ngcontent-%COMP%]:not(.correct) {\n  box-shadow: 0 4px 0 var(--ink), 0 0 0 3px var(--accent-green);\n}\n.cell.highlighted[_ngcontent-%COMP%]:not(.you-guessed):not(.correct):not(.incorrect):not(.is-truth) {\n  background: var(--paper-warm);\n}\n\n.cell.unavailable[_ngcontent-%COMP%]:not(.you-guessed):not(.correct):not(.incorrect):not(.highlighted) {\n  scale: 0.82;\n  background: #d4d0d8;\n  color: rgba(26, 19, 48, 0.5);\n}\n\n.reveal-banner[_ngcontent-%COMP%] {\n  padding: 1.1rem 1.25rem;\n  border-radius: 16px;\n  border: 3px solid var(--ink);\n  text-align: center;\n  font-family: \"Permanent Marker\", \"Beleren\", cursive;\n  font-size: 2rem;\n  font-weight: 400;\n  letter-spacing: 0.02em;\n  margin-bottom: 1rem;\n  background: var(--paper);\n  color: var(--ink);\n  box-shadow: 0 6px 0 var(--ink);\n  animation: reveal-pop 450ms cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.reveal-banner.win[_ngcontent-%COMP%] {\n  background: var(--accent-green);\n  animation: reveal-pop 450ms cubic-bezier(0.34, 1.56, 0.64, 1), win-glow 1.4s ease-out 450ms 1;\n}\n.reveal-banner.lose[_ngcontent-%COMP%] {\n  background: var(--accent-red);\n  animation: reveal-pop 450ms cubic-bezier(0.34, 1.56, 0.64, 1), lose-shake 420ms cubic-bezier(0.36, 0.07, 0.19, 0.97) 450ms 1;\n}\n.reveal-truth[_ngcontent-%COMP%] {\n  font-family: \"Caveat\", cursive;\n  font-size: 1.3rem;\n  font-weight: 700;\n  margin-top: 0.25rem;\n  opacity: 0.95;\n  letter-spacing: 0;\n}\n@keyframes reveal-pop {\n  0% {\n    transform: scale(0.7) translateY(-12px);\n    opacity: 0;\n  }\n  60% {\n    transform: scale(1.06) translateY(0);\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1) translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes win-glow {\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(6, 214, 160, 0);\n  }\n  50% {\n    box-shadow: 0 0 0 18px rgba(6, 214, 160, 0.35);\n  }\n}\n@keyframes lose-shake {\n  10%, 90% {\n    transform: translateX(-2px);\n  }\n  20%, 80% {\n    transform: translateX(3px);\n  }\n  30%, 50%, 70% {\n    transform: translateX(-5px);\n  }\n  40%, 60% {\n    transform: translateX(5px);\n  }\n}\n\n.waiting-card[_ngcontent-%COMP%] {\n  color: var(--ink);\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  justify-content: center;\n  padding: 0.8rem 1rem;\n  margin-bottom: 1rem;\n  color: var(--text-dim);\n  font-size: 0.85rem;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n.waiting-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--accent-yellow);\n  box-shadow: 0 0 6px rgba(255, 209, 102, 0.6);\n  animation: waiting-pulse 1.4s ease-in-out infinite;\n}\n@keyframes waiting-pulse {\n  0%, 100% {\n    opacity: 0.4;\n    transform: scale(0.8);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.1);\n  }\n}\n.lobby-players[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.lobby-player-name[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.score-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1.25rem;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  position: sticky;\n  bottom: 0.5rem;\n}\n.score-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: var(--text-dim);\n}\n.score-value[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: var(--accent-yellow);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXllci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxxRkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUVGO0FBQ0E7RUFDRSxpQkFBQTtFQUNBLGFBQUE7RUFDQSx1RUFBQTtFQUNBLGtVQUNFO0VBSUYsNEJBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG9CQUFBO0FBRkY7QUFJQTtFQUFjLFdBQUE7RUFBYSxnQkFBQTtFQUFrQixpQkFBQTtFQUFtQixrQkFBQTtBQUdoRTtBQURBLHdGQUFBO0FBQ0E7RUFDRSx3QkFBQTtFQUNBLGlCQUFBO0VBQ0EsNEJBQUE7RUFDQSxtQkFBQTtFQUNBLDhEQUFBO0FBSUY7QUFGQTtFQUEwQixpQkFBQTtBQU0xQjtBQUpBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7QUFPRjtBQUxBLDhEQUFBO0FBQ0E7RUFDRSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLHVDQUFBO0VBQ0Esd0JBQUE7RUFDQSw0QkFBQTtFQUNBLG9CQUFBO0VBQ0EsOEJBQUE7RUFDQSw4QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUFRRjtBQU5BO0VBQVcsa0JBQUE7RUFBb0IsY0FBQTtBQVcvQjtBQVZBO0VBQ0UsZ0NBQUE7RUFDQSxpQkFBQTtFQUNBLDRCQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7QUFhRjtBQVhBO0VBQXNDLFdBQUE7RUFBYSxZQUFBO0VBQWMsNkJBQUE7RUFBK0Isb0JBQUE7QUFrQmhHO0FBakJBO0VBQWMscUJBQUE7QUFxQmQ7QUFwQkE7RUFDRSxtREFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLHVHQUFBO0FBdUJGO0FBckJBO0VBQWMsMkJBQUE7QUF5QmQ7QUF4QkE7RUFDRSx1Q0FBQTtFQUNBLGdCQUFBO0FBMkJGO0FBeEJBLGVBQUE7QUFDQTtFQUNFLG9CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQTJCRjtBQXpCQTtFQUNFLG1EQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0FBNEJGO0FBMUJBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7QUE2QkY7QUEzQkE7RUFDRSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtFQUNBLHVCQUFBO0VBQ0EsNEJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMERBQUE7RUFDQSw4QkFBQTtFQUNBLGdCQUFBO0FBOEJGO0FBNUJBO0VBQW9CLDBDQUFBO0FBZ0NwQjtBQS9CQTtFQUEyQixpQkFBQTtFQUFtQixZQUFBO0FBb0M5QztBQWxDQTtFQUFrQixXQUFBO0FBc0NsQjtBQXBDQSxlQUFBO0FBQ0E7RUFDRSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUF1Q0Y7QUFyQ0E7RUFDRSxtREFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0FBd0NGO0FBdENBO0VBQWtCLGlCQUFBO0VBQW1CLFlBQUE7RUFBYyxTQUFBO0FBNENuRDtBQTNDQTtFQUNFLFdBQUE7RUFBYSxZQUFBO0VBQWMsY0FBQTtFQUMzQiwrQkFBQTtFQUNBLHNDQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQ0FBQTtBQWdERjtBQTlDQTtFQUFrQjtJQUFLLHlCQUFBO0VBbURyQjtBQUNGO0FBbERBLFVBQUE7QUFDQTtFQUFTLGVBQUE7QUFxRFQ7QUFwREE7RUFDRSxtREFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0FBdURGO0FBckRBO0VBQWEsaUJBQUE7RUFBbUIsWUFBQTtFQUFjLHdCQUFBO0FBMkQ5QztBQTFEQTtFQUNFLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUNBQUE7RUFDQSxvQkFBQTtFQUNBLHFCQUFBO0FBNkRGO0FBM0RBO0VBQ0UsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtBQThERjtBQTVEQTtFQUNFLHNCQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0FBK0RGO0FBN0RBO0VBQ0UscUNBQUE7RUFDQSxzQ0FBQTtFQUNBLGdCQUFBO0FBZ0VGO0FBN0RBLGVBQUE7QUFDQTtFQUNFLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSwyREFBQTtFQUNBLDRCQUFBO0FBZ0VGO0FBOURBO0VBQ0U7SUFBTyxVQUFBO0lBQVksdUNBQUE7RUFtRW5CO0VBbEVBO0lBQU8sVUFBQTtJQUFZLHVDQUFBO0VBc0VuQjtFQXJFQTtJQUFPLFVBQUE7SUFBWSxpQ0FBQTtFQXlFbkI7QUFDRjtBQXhFQTtFQUNFO0lBQU8sVUFBQTtJQUFZLDRCQUFBO0VBNEVuQjtFQTNFQTtJQUFPLFVBQUE7SUFBWSx3QkFBQTtFQStFbkI7QUFDRjtBQTlFQTtFQUNFO0lBQU8sVUFBQTtJQUFZLHNDQUFBO0VBa0ZuQjtFQWpGQTtJQUFPLFVBQUE7SUFBWSx1Q0FBQTtFQXFGbkI7RUFwRkE7SUFBTyxVQUFBO0lBQVksaUNBQUE7RUF3Rm5CO0FBQ0Y7QUF2RkE7RUFDRSw0Q0FBQTtFQUNBLHFCQUFBO0FBeUZGO0FBdkZBO0VBQ0UsK0RBQUE7QUEwRkY7QUF4RkE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7QUEyRkY7QUF6RkE7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtBQTRGRjtBQTFGQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUE2RkY7QUEzRkE7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLDJDQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQThGRjtBQTVGQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBK0ZGO0FBN0ZBO0VBQ0UsdUJBQUE7RUFDQSxpQkFBQTtFQUNBLHdCQUFBO0VBQ0Esb0JBQUE7RUFDQSw4QkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLGlHQUFBO0VBQ0EsY0FBQTtBQWdHRjtBQTlGQTtFQUNFLGdCQUFBO0VBQ0EsOEJBQUE7QUFpR0Y7QUEvRkE7RUFDRSxnQ0FBQTtBQWtHRjtBQWhHQTtFQUNFLCtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnRUFBQTtBQW1HRjtBQWpHQTtFQUNFLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7QUFvR0Y7QUFqR0Esb0NBQUE7QUFDQTtFQUNFLCtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpRUFBQTtFQUNBLGlFQUFBO0FBb0dGO0FBbEdBO0VBQ0UsWUFBQTtFQUNBLG9CQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtBQXFHRjtBQW5HQTtFQUNFLDZCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpRUFBQTtFQUNBLDBDQUFBO0FBc0dGO0FBcEdBO0VBQ0UsWUFBQTtFQUNBLG9CQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtBQXVHRjtBQXJHQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG9CQUFBO0FBd0dGO0FBdEdBO0VBQ0U7SUFBTyxtQkFBQTtFQTBHUDtFQXpHQTtJQUFPLG9DQUFBO0VBNEdQO0VBM0dBO0lBQU8sbUNBQUE7RUE4R1A7RUE3R0E7SUFBTyw2QkFBQTtFQWdIUDtBQUNGO0FBL0dBO0VBQ0U7SUFBVyx3QkFBQTtFQWtIWDtFQWpIQTtJQUFXLHlDQUFBO0VBb0hYO0VBbkhBO0lBQVcsdUNBQUE7RUFzSFg7RUFySEE7SUFBVyx5Q0FBQTtFQXdIWDtFQXZIQTtJQUFXLHVDQUFBO0VBMEhYO0FBQ0Y7QUF4SEEsMkRBQUE7QUFDQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLG9FQUFBO0VBQ0EsMEJBQUE7RUFDQSxXQUFBO0FBMEhGO0FBeEhBO0VBQU8sYUFBQTtFQUFlLFFBQUE7QUE2SHRCO0FBNUhBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLDhCQUFBO0VBQ0EsdUNBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLDRCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLHNLQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxjQUFBO0FBK0hGO0FBN0hBO0VBQ0UsZ0JBQUE7RUFDQSw4QkFBQTtBQWdJRjtBQTlIQSxzREFBQTtBQUNBO0VBQTZDLGVBQUE7QUFrSTdDO0FBaklBO0VBQTZDLGNBQUE7QUFxSTdDO0FBcElBO0VBQTZDLGVBQUE7QUF3STdDO0FBdklBO0VBQTZDLGNBQUE7QUEySTdDO0FBMUlBO0VBQTZDLGNBQUE7QUE4STdDO0FBN0lBO0VBQTZDLGVBQUE7QUFpSjdDO0FBaEpBO0VBQTZDLGNBQUE7QUFvSjdDO0FBbEpBO0VBQWEsa0JBQUE7RUFBb0IsVUFBQTtFQUFZLG9CQUFBO0FBd0o3QztBQXZKQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLG9CQUFBO0VBQ0EsVUFBQTtBQTBKRjtBQXhKQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQTs7K0RBQUE7RUFHQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSw0RUFBQTtFQUNBLDZCQUFBO0VBQ0Esa0RBQUE7RUFDQSxxRUFBQTtFQUNBLHlEQUFBO0VBQ0EsVUFBQTtBQTJKRjtBQXpKQSxtRkFBQTtBQUNBO0VBQ0UsWUFBQTtFQUNBLGtEQUFBO0VBQ0EsVUFBQTtBQTRKRjtBQTFKQTtpQkFBQTtBQUVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLG9CQUFBO0FBNkpGO0FBM0pBOzBFQUFBO0FBRUE7RUFDRTtJQUNFLHFCQUFBO0lBQ0EsVUFBQTtJQUNBLDREQUFBO0VBOEpGO0VBNUpBO0lBQ0UsbUJBQUE7SUFDQSxVQUFBO0lBQ0EsMERBQUE7RUE4SkY7RUE1SkE7SUFDRSxtQ0FBQTtFQThKRjtFQTVKQTtJQUNFLG9DQUFBO0VBOEpGO0VBNUpBO0lBQ0UsbUNBQUE7RUE4SkY7RUE1SkE7SUFDRSxnQ0FBQTtFQThKRjtBQUNGO0FBM0pBLGlDQUFBO0FBQ0E7RUFDRSw4QkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLHlEQUFBO0VBQ0EsNkVBQUE7QUE2SkY7QUEzSkE7RUFDRSxnQ0FBQTtFQUNBLDZIQUNFO0FBNkpKO0FBMUpBO0VBQ0UsbURBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLHdDQUFBO0FBNkpGO0FBM0pBO0VBQ0UsOEJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQThKRjtBQTVKQTtFQUNFLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7QUErSkY7QUE3SkE7RUFDRSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsNEJBQUE7RUFDQSxvQkFBQTtFQUNBLHNDQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsOEJBQUE7QUFnS0Y7QUE5SkE7RUFBMkMsV0FBQTtFQUFhLFlBQUE7RUFBYyw2QkFBQTtFQUErQixvQkFBQTtBQXFLckc7QUFwS0E7RUFDRTtJQUFPLG1DQUFBO0lBQXFDLFVBQUE7RUF5SzVDO0VBeEtBO0lBQU8sbUNBQUE7SUFBc0MsVUFBQTtFQTRLN0M7RUEzS0E7SUFBTyw2QkFBQTtJQUErQixVQUFBO0VBK0t0QztBQUNGO0FBOUtBO0VBQ0U7SUFBVyw4REFBQTtFQWlMWDtFQWhMQTtJQUFXLG1FQUFBO0VBbUxYO0FBQ0Y7QUFqTEEscUZBQUE7QUFDQTtFQUNFLDhEQUFBO0VBQ0EsVUFBQTtFQUNBLGtEQUFBO0FBbUxGO0FBakxBO0VBQ0U7SUFBVyw4REFBQTtFQXFMWDtFQXBMQTtJQUFXLG1FQUFBO0VBdUxYO0FBQ0Y7QUF0TEE7RUFDRTtJQUF1QixlQUFBO0VBeUx2QjtBQUNGO0FBeExBO0VBQ0UsZ0NBQUE7RUFDQSxpQkFBQTtFQUNBLHFEQUFBO0FBMExGO0FBeExBO0VBQ0U7SUFBTyxnRUFBQTtFQTRMUDtFQTNMQTtJQUFPLGlFQUFBO0VBOExQO0FBQ0Y7QUE3TEE7RUFDRSwrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUVBQUE7QUErTEY7QUE3TEE7RUFDRSw2QkFBQTtFQUNBLGlCQUFBO0VBQ0EsMEVBQUE7QUFnTUY7QUE5TEE7RUFDRTtJQUFPLHNCQUFBO0lBQXdCLDBDQUFBO0VBbU0vQjtFQWxNQTtJQUFPLHNCQUFBO0lBQXdCLDJDQUFBO0VBc00vQjtFQXJNQTtJQUFPLG1CQUFBO0lBQXFCLHFFQUFBO0VBeU01QjtBQUNGO0FBeE1BO0VBQ0U7SUFBVywyQkFBQTtFQTJNWDtFQTFNQTtJQUFXLDBCQUFBO0VBNk1YO0VBNU1BO0lBQWdCLDJCQUFBO0VBK01oQjtFQTlNQTtJQUFXLDBCQUFBO0VBaU5YO0FBQ0Y7QUFoTkE7RUFDRSw2REFBQTtBQWtORjtBQWhOQTtFQUNFLDZCQUFBO0FBbU5GO0FBak5BOzttRUFBQTtBQUdBO0VBQ0UsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsNEJBQUE7QUFvTkY7QUFqTkEsc0NBQUE7QUFDQTtFQUNFLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0VBQ0EsbURBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esd0JBQUE7RUFDQSxpQkFBQTtFQUNBLDhCQUFBO0VBQ0EsNkRBQUE7QUFvTkY7QUFsTkE7RUFDRSwrQkFBQTtFQUNBLDZGQUNFO0FBb05KO0FBak5BO0VBQ0UsNkJBQUE7RUFDQSw0SEFDRTtBQW1OSjtBQWhOQTtFQUNFLDhCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0FBbU5GO0FBak5BO0VBQ0U7SUFBTyx1Q0FBQTtJQUF5QyxVQUFBO0VBc05oRDtFQXJOQTtJQUFPLG9DQUFBO0lBQXNDLFVBQUE7RUF5TjdDO0VBeE5BO0lBQU8saUNBQUE7SUFBbUMsVUFBQTtFQTROMUM7QUFDRjtBQTNOQTtFQUNFO0lBQVcsd0NBQUE7RUE4Tlg7RUE3TkE7SUFBVyw4Q0FBQTtFQWdPWDtBQUNGO0FBL05BO0VBQ0U7SUFBVywyQkFBQTtFQWtPWDtFQWpPQTtJQUFXLDBCQUFBO0VBb09YO0VBbk9BO0lBQWdCLDJCQUFBO0VBc09oQjtFQXJPQTtJQUFXLDBCQUFBO0VBd09YO0FBQ0Y7QUF0T0EsK0JBQUE7QUFDQTtFQUNFLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUF3T0Y7QUF0T0E7RUFDRSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSw0Q0FBQTtFQUNBLGtEQUFBO0FBeU9GO0FBdk9BO0VBQ0U7SUFBVyxZQUFBO0lBQWMscUJBQUE7RUE0T3pCO0VBM09BO0lBQVcsVUFBQTtJQUFjLHFCQUFBO0VBK096QjtBQUNGO0FBN09BO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQStPRjtBQTdPQTtFQUFxQixPQUFBO0FBaVByQjtBQS9PQSxjQUFBO0FBQ0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLHdCQUFBO0VBQ0EsMEJBQUE7RUFDQSwrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBa1BGO0FBaFBBO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7QUFtUEY7QUFqUEE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsMkJBQUE7QUFvUEYiLCJmaWxlIjoicGxheWVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xyXG4gIC8qIFN0aWNrZXItYm9vayBwYWxldHRlOiBjcmVhbSBwYXBlciBvbiBzYXR1cmF0ZWQgTVRHLWxhbmQgYmFja2Ryb3AsIG5lYXItYmxhY2sgaW5rICovXHJcbiAgLS1wYXBlcjogI2ZmZmFlZTtcclxuICAtLXBhcGVyLXdhcm06ICNmZmYxZDA7XHJcbiAgLS1pbms6ICMxYTEzMzA7XHJcbiAgLS10aWxlOiAjZmZmZmZmO1xyXG59XHJcblxyXG4ucGxheWVyIHtcclxuICBtaW4taGVpZ2h0OiAxMDB2aDtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG4gIC8qIFNhdHVyYXRlZCBwYXJ0eS1nYW1lIGdyYWRpZW50IHdpdGggYSBzdWJ0bGUgc3RyaXBlIHBhdHRlcm4gb3ZlcmxheSAqL1xyXG4gIGJhY2tncm91bmQ6XHJcbiAgICByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDEzNWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSAwIDE0cHgsIHRyYW5zcGFyZW50IDE0cHggMjhweCksXHJcbiAgICByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IHRvcCByaWdodCwgcmdiYSgyNTUsIDIwOSwgMTAyLCAwLjQpLCB0cmFuc3BhcmVudCA1NSUpLFxyXG4gICAgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCBib3R0b20gbGVmdCwgcmdiYSg3NiwgMjAxLCAyNDAsIDAuMzUpLCB0cmFuc3BhcmVudCA1NSUpLFxyXG4gICAgbGluZWFyLWdyYWRpZW50KDE2MGRlZywgI2ZmOGM0MiwgI2VmNDc2ZiA0NSUsICNiMThhZmYpO1xyXG4gIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XHJcbiAgY29sb3I6IHZhcigtLWluayk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xyXG59XHJcbi5wbGF5ZXIgPiAqIHsgd2lkdGg6IDEwMCU7IG1heC13aWR0aDogNTQwcHg7IG1hcmdpbi1sZWZ0OiBhdXRvOyBtYXJnaW4tcmlnaHQ6IGF1dG87IH1cclxuXHJcbi8qID09PSBTdGlja2VyIGNhcmRzOiBjcmVhbSBwYXBlciBvbiBicmlnaHQgYmcsIHRoaWNrIGJsYWNrIG91dGxpbmUsIGNodW5reSBzaGFkb3cgPT09ICovXHJcbi5wbGF5ZXIgLnNiLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLXBhcGVyKTtcclxuICBjb2xvcjogdmFyKC0taW5rKTtcclxuICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1pbmspO1xyXG4gIGJvcmRlci1yYWRpdXM6IDE4cHg7XHJcbiAgYm94LXNoYWRvdzogMCA2cHggMCB2YXIoLS1pbmspLCAwIDE0cHggMjhweCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbn1cclxuLnBsYXllciAuc2ItY2FyZCBzdHJvbmcgeyBjb2xvcjogdmFyKC0taW5rKTsgfVxyXG5cclxuLmhkciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBwYWRkaW5nOiAwLjI1cmVtIDAgMXJlbTtcclxuICBnYXA6IDAuNXJlbTtcclxufVxyXG4vKiBMaXZlLXBoYXNlIHBsYXllciBiYWRnZTogYXZhdGFyICsgbmFtZSArIHNjb3JlLCB0b3AgcmlnaHQgKi9cclxuLm1lLWJhZGdlIHtcclxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMC41cmVtO1xyXG4gIHBhZGRpbmc6IDAuMjVyZW0gMC43NXJlbSAwLjI1cmVtIDAuM3JlbTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1wYXBlcik7XHJcbiAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0taW5rKTtcclxuICBib3JkZXItcmFkaXVzOiA5OTlweDtcclxuICBib3gtc2hhZG93OiAwIDNweCAwIHZhcigtLWluayk7XHJcbiAgZm9udC1mYW1pbHk6ICdDYXZlYXQnLCBjdXJzaXZlO1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgY29sb3I6IHZhcigtLWluayk7XHJcbn1cclxuLm1lLW5hbWUgeyBmb250LXNpemU6IDEuMTVyZW07IGxpbmUtaGVpZ2h0OiAxOyB9XHJcbi5tZS1zY29yZSB7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LXllbGxvdyk7XHJcbiAgY29sb3I6IHZhcigtLWluayk7XHJcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0taW5rKTtcclxuICBib3JkZXItcmFkaXVzOiA5OTlweDtcclxuICBwYWRkaW5nOiAwIDAuNXJlbTtcclxuICBmb250LXNpemU6IDEuMTVyZW07XHJcbiAgbGluZS1oZWlnaHQ6IDEuMztcclxuICBtaW4td2lkdGg6IDEuNGVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXZhcmlhbnQtbnVtZXJpYzogdGFidWxhci1udW1zO1xyXG59XHJcbi5tZS1iYWRnZSA6Om5nLWRlZXAgLmF2YXRhci5zaXplLXNtIHsgd2lkdGg6IDI2cHg7IGhlaWdodDogMjZweDsgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLWluayk7IG91dGxpbmUtb2Zmc2V0OiAtMnB4OyB9XHJcbi5icmFuZC1saW5rIHsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XHJcbi5icmFuZCB7XHJcbiAgZm9udC1mYW1pbHk6ICdQZXJtYW5lbnQgTWFya2VyJywgJ0JlbGVyZW4nLCBjdXJzaXZlO1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTtcclxuICBjb2xvcjogdmFyKC0tYWNjZW50LXllbGxvdyk7XHJcbiAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRleHQtc2hhZG93OiAtMXB4IC0xcHggMCB2YXIoLS1pbmspLCAxcHggLTFweCAwIHZhcigtLWluayksIC0xcHggMXB4IDAgdmFyKC0taW5rKSwgMXB4IDFweCAwIHZhcigtLWluayk7XHJcbn1cclxuLmJyYW5kIHNwYW4geyBjb2xvcjogdmFyKC0tYWNjZW50LXB1cnBsZSk7IH1cclxuLndlbGNvbWUsIC5sb2JieS10aXRsZSB7XHJcbiAgZm9udC1mYW1pbHk6ICdCZWxlcmVuJywgJ1JvYm90bycsIHNlcmlmO1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbn1cclxuXHJcbi8qIE5hbWUgZW50cnkgKi9cclxuLm5hbWUtY2FyZCB7XHJcbiAgcGFkZGluZzogMnJlbSAxLjVyZW07XHJcbiAgbWFyZ2luLXRvcDogNHJlbTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLndlbGNvbWUge1xyXG4gIGZvbnQtZmFtaWx5OiAnUGVybWFuZW50IE1hcmtlcicsICdCZWxlcmVuJywgY3Vyc2l2ZTtcclxuICBmb250LXNpemU6IDIuNnJlbTtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogdmFyKC0taW5rKTtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wMWVtO1xyXG59XHJcbi53ZWxjb21lLXN1YiB7XHJcbiAgY29sb3I6IHZhcigtLWluayk7XHJcbiAgb3BhY2l0eTogMC43O1xyXG4gIG1hcmdpbjogMC41cmVtIDAgMS41cmVtO1xyXG59XHJcbi5uYW1lLWlucHV0IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAxcmVtIDEuMjVyZW07XHJcbiAgZm9udC1zaXplOiAxLjNyZW07XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tdGlsZSk7XHJcbiAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0taW5rKTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pbmspO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTIwbXMgZWFzZSwgYm94LXNoYWRvdyAxMjBtcyBlYXNlO1xyXG4gIGZvbnQtZmFtaWx5OiAnQ2F2ZWF0JywgY3Vyc2l2ZTtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG59XHJcbi5uYW1lLWlucHV0OmZvY3VzIHsgYm94LXNoYWRvdzogMCAwIDAgM3B4IHZhcigtLWFjY2VudC15ZWxsb3cpOyB9XHJcbi5uYW1lLWlucHV0OjpwbGFjZWhvbGRlciB7IGNvbG9yOiB2YXIoLS1pbmspOyBvcGFjaXR5OiAwLjQ7IH1cclxuXHJcbi5zYi1idXR0b24uZnVsbCB7IHdpZHRoOiAxMDAlOyB9XHJcblxyXG4vKiBDb25uZWN0aW5nICovXHJcbi5jb25uZWN0aW5nIHtcclxuICBwYWRkaW5nOiAyLjVyZW0gMS41cmVtO1xyXG4gIG1hcmdpbi10b3A6IDRyZW07XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5jb25uZWN0aW5nLXRpdGxlIHtcclxuICBmb250LWZhbWlseTogJ1Blcm1hbmVudCBNYXJrZXInLCAnQmVsZXJlbicsIGN1cnNpdmU7XHJcbiAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICBmb250LXNpemU6IDEuOHJlbTtcclxuICBjb2xvcjogdmFyKC0taW5rKTtcclxuICBtYXJnaW46IDAuNzVyZW0gMCAwLjI1cmVtO1xyXG59XHJcbi5jb25uZWN0aW5nLXN1YiB7IGNvbG9yOiB2YXIoLS1pbmspOyBvcGFjaXR5OiAwLjc7IG1hcmdpbjogMDsgfVxyXG4uc3Bpbm5lciB7XHJcbiAgd2lkdGg6IDQ4cHg7IGhlaWdodDogNDhweDsgbWFyZ2luOiAwIGF1dG87XHJcbiAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tYm9yZGVyKTtcclxuICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1hY2NlbnQteWVsbG93KTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYW5pbWF0aW9uOiBzcGluIDgwMG1zIGxpbmVhciBpbmZpbml0ZTtcclxufVxyXG5Aa2V5ZnJhbWVzIHNwaW4geyB0byB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfVxyXG5cclxuLyogTG9iYnkgKi9cclxuLmxvYmJ5IHsgcGFkZGluZzogMS41cmVtOyB9XHJcbi5sb2JieS10aXRsZSB7XHJcbiAgZm9udC1mYW1pbHk6ICdQZXJtYW5lbnQgTWFya2VyJywgJ0JlbGVyZW4nLCBjdXJzaXZlO1xyXG4gIGZvbnQtc2l6ZTogMnJlbTtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogdmFyKC0taW5rKTtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wMWVtO1xyXG59XHJcbi5sb2JieS1zdWIgeyBjb2xvcjogdmFyKC0taW5rKTsgb3BhY2l0eTogMC43OyBtYXJnaW46IDAuM3JlbSAwIDEuMjVyZW07IH1cclxuLmxvYmJ5LWRpdmlkZXIge1xyXG4gIGZvbnQtc2l6ZTogMC44cmVtO1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjE1ZW07XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBjb2xvcjogdmFyKC0tdGV4dC1kaW0pO1xyXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xyXG4gIHBhZGRpbmctdG9wOiAwLjc1cmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcclxufVxyXG4ubG9iYnktcGxheWVycyB7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxuICBwYWRkaW5nOiAwO1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG4ubG9iYnktcGxheWVycyBsaSB7XHJcbiAgcGFkZGluZzogMC42cmVtIDAuOXJlbTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy1jYXJkLTIpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBtYXJnaW4tYm90dG9tOiAwLjRyZW07XHJcbn1cclxuLmxvYmJ5LXBsYXllcnMgbGkueW91IHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjA5LCAxMDIsIDAuMTUpO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWFjY2VudC15ZWxsb3cpO1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbn1cclxuXHJcbi8qIFF1b3RlIGFyZWEgKi9cclxuLnF1b3RlLWFyZWEge1xyXG4gIHBhZGRpbmc6IDFyZW0gMS4yNXJlbTtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIGFuaW1hdGlvbjogcXVvdGUtaW4gMzgwbXMgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNTYsIDAuNjQsIDEpO1xyXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XHJcbn1cclxuQGtleWZyYW1lcyBxdW90ZS1pbiB7XHJcbiAgMCUgICB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxNHB4KSBzY2FsZSgwLjk2KTsgfVxyXG4gIDYwJSAgeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCkgc2NhbGUoMS4wMik7IH1cclxuICAxMDAlIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApIHNjYWxlKDEpOyB9XHJcbn1cclxuQGtleWZyYW1lcyBxdW90ZS10ZXh0LWluIHtcclxuICAwJSAgIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMHB4KTsgfVxyXG4gIDEwMCUgeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH1cclxufVxyXG5Aa2V5ZnJhbWVzIGNoaXAtaW4ge1xyXG4gIDAlICAgeyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoOHB4KSBzY2FsZSgwLjg1KTsgfVxyXG4gIDcwJSAgeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCkgc2NhbGUoMS4wNCk7IH1cclxuICAxMDAlIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApIHNjYWxlKDEpOyB9XHJcbn1cclxuLnF1b3RlLWFyZWEgYmxvY2txdW90ZSB7XHJcbiAgYW5pbWF0aW9uOiBxdW90ZS10ZXh0LWluIDMyMG1zIGVhc2Utb3V0IGJvdGg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiA4MG1zO1xyXG59XHJcbi5wb3NzaWJsZS1jaGlwIHtcclxuICBhbmltYXRpb246IGNoaXAtaW4gMzIwbXMgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNTYsIDAuNjQsIDEpIGJvdGg7XHJcbn1cclxuLnF1b3RlLWhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xyXG4gIGdhcDogMC41cmVtO1xyXG59XHJcbi5xdW90ZS1pbmRleCB7XHJcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjE1ZW07XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBjb2xvcjogdmFyKC0taW5rKTtcclxuICBvcGFjaXR5OiAwLjU1O1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbn1cclxuLnF1b3RlLWhpbnQge1xyXG4gIGZvbnQtc2l6ZTogMC42NXJlbTtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wOGVtO1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgY29sb3I6IHZhcigtLWluayk7XHJcbiAgb3BhY2l0eTogMC40NTtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuLnF1b3RlLWFyZWEgYmxvY2txdW90ZSB7XHJcbiAgZm9udC1zaXplOiAxLjNyZW07XHJcbiAgbGluZS1oZWlnaHQ6IDEuMzU7XHJcbiAgbWFyZ2luOiAwLjZyZW0gMDtcclxuICBwYWRkaW5nLWxlZnQ6IDAuNzVyZW07XHJcbiAgYm9yZGVyLWxlZnQ6IDZweCBzb2xpZCB2YXIoLS1hY2NlbnQteWVsbG93KTtcclxuICBjb2xvcjogdmFyKC0taW5rKTtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcbi5wb3NzaWJsZXMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGdhcDogMC41cmVtO1xyXG4gIG1hcmdpbi10b3A6IDAuOXJlbTtcclxufVxyXG4ucG9zc2libGUtY2hpcCB7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tdGlsZSk7XHJcbiAgY29sb3I6IHZhcigtLWluayk7XHJcbiAgcGFkZGluZzogMC40NXJlbSAwLjk1cmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xyXG4gIGZvbnQtZmFtaWx5OiAnQ2F2ZWF0JywgY3Vyc2l2ZTtcclxuICBmb250LXNpemU6IDEuM3JlbTtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWluayk7XHJcbiAgYm94LXNoYWRvdzogMCAzcHggMCB2YXIoLS1pbmspO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDE1MG1zIGVhc2UsIHRyYW5zZm9ybSA4MG1zIGVhc2UsIGJveC1zaGFkb3cgODBtcyBlYXNlLCB0cmFuc2xhdGUgODBtcyBlYXNlO1xyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG59XHJcbi5wb3NzaWJsZS1jaGlwOmFjdGl2ZSB7XHJcbiAgdHJhbnNsYXRlOiAwIDJweDtcclxuICBib3gtc2hhZG93OiAwIDFweCAwIHZhcigtLWluayk7XHJcbn1cclxuLnBvc3NpYmxlLWNoaXAuaGlnaGxpZ2h0ZWQ6bm90KC5sb2NrZWQpIHtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQteWVsbG93KTtcclxufVxyXG4ucG9zc2libGUtY2hpcC5sb2NrZWQge1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1ncmVlbik7XHJcbiAgY29sb3I6IHZhcigtLWluayk7XHJcbiAgYm94LXNoYWRvdzogMCAzcHggMCB2YXIoLS1pbmspLCAwIDAgMCAzcHggcmdiYSg2LCAyMTQsIDE2MCwgMC40KTtcclxufVxyXG4ucG9zc2libGUtY2hpcC5sb2NrZWQ6OmJlZm9yZSB7XHJcbiAgY29udGVudDogJ+Kckyc7XHJcbiAgbWFyZ2luLXJpZ2h0OiAwLjI1cmVtO1xyXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcclxuICBmb250LXdlaWdodDogODAwO1xyXG59XHJcblxyXG4vKiA9PT0gUG9zdC1yZXZlYWwgY2hpcCBzdGF0ZXMgPT09ICovXHJcbi5wb3NzaWJsZS1jaGlwLmlzLXRydXRoIHtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQtZ3JlZW4pO1xyXG4gIGNvbG9yOiB2YXIoLS1pbmspO1xyXG4gIGJveC1zaGFkb3c6IDAgM3B4IDAgdmFyKC0taW5rKSwgMCAwIDAgNHB4IHJnYmEoNiwgMjE0LCAxNjAsIDAuNDUpO1xyXG4gIGFuaW1hdGlvbjogY2hpcC10cnV0aC1wb3AgNjIwbXMgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNTYsIDAuNjQsIDEpO1xyXG59XHJcbi5wb3NzaWJsZS1jaGlwLmlzLXRydXRoOjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6ICfinJMnO1xyXG4gIG1hcmdpbi1yaWdodDogMC4zcmVtO1xyXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcclxuICBmb250LXdlaWdodDogODAwO1xyXG59XHJcbi5wb3NzaWJsZS1jaGlwLmlzLXdyb25nIHtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQtcmVkKTtcclxuICBjb2xvcjogdmFyKC0taW5rKTtcclxuICBib3gtc2hhZG93OiAwIDNweCAwIHZhcigtLWluayksIDAgMCAwIDRweCByZ2JhKDIzOSwgNzEsIDExMSwgMC40KTtcclxuICBhbmltYXRpb246IGNoaXAtd3Jvbmctc2hha2UgNDAwbXMgZWFzZS1vdXQ7XHJcbn1cclxuLnBvc3NpYmxlLWNoaXAuaXMtd3Jvbmc6OmJlZm9yZSB7XHJcbiAgY29udGVudDogJ+Kclyc7XHJcbiAgbWFyZ2luLXJpZ2h0OiAwLjNyZW07XHJcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtd2VpZ2h0OiA4MDA7XHJcbn1cclxuLnBvc3NpYmxlLWNoaXAuaXMtZGltIHtcclxuICBvcGFjaXR5OiAwLjU1O1xyXG4gIGZpbHRlcjogZ3JheXNjYWxlKDAuNCk7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbn1cclxuQGtleWZyYW1lcyBjaGlwLXRydXRoLXBvcCB7XHJcbiAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cclxuICAzNSUgIHsgdHJhbnNmb3JtOiBzY2FsZSgxLjEyKSByb3RhdGUoLTJkZWcpOyB9XHJcbiAgNjAlICB7IHRyYW5zZm9ybTogc2NhbGUoMC45Nykgcm90YXRlKDFkZWcpOyB9XHJcbiAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSkgcm90YXRlKDApOyB9XHJcbn1cclxuQGtleWZyYW1lcyBjaGlwLXdyb25nLXNoYWtlIHtcclxuICAwJSwgMTAwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgfVxyXG4gIDIwJSAgICAgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC00cHgpIHJvdGF0ZSgtMmRlZyk7IH1cclxuICA0MCUgICAgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCg0cHgpIHJvdGF0ZSgyZGVnKTsgfVxyXG4gIDYwJSAgICAgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ycHgpIHJvdGF0ZSgtMWRlZyk7IH1cclxuICA4MCUgICAgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgycHgpIHJvdGF0ZSgxZGVnKTsgfVxyXG59XHJcblxyXG4vKiBDYXJkIGdyaWQg4oCUIGZyZWUtZmxvYXRpbmcgdGlsZXMgdGhhdCBmaWxsIHRoZSB2aWV3cG9ydCAqL1xyXG4uY2FyZC1ncmlkIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiA2cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAvKiBFc2NhcGUgdGhlIC5wbGF5ZXIgPiAqIG1heC13aWR0aCBjbGFtcCBzbyB0aGUgYm9hcmQgY2FuIGJyZWF0aGUgKi9cclxuICBtYXgtd2lkdGg6IG5vbmUgIWltcG9ydGFudDtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG4ucm93IHsgZGlzcGxheTogZmxleDsgZ2FwOiA2cHg7IH1cclxuLmNlbGwge1xyXG4gIC0tdGlsdDogMGRlZztcclxuICBmbGV4OiAxIDEgMDtcclxuICBtaW4td2lkdGg6IDA7XHJcbiAgYXNwZWN0LXJhdGlvOiAxO1xyXG4gIGZvbnQtZmFtaWx5OiAnQ2F2ZWF0JywgY3Vyc2l2ZTtcclxuICBmb250LXNpemU6IGNsYW1wKDAuOTVyZW0sIDN2dywgMS4zNXJlbSk7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wMWVtO1xyXG4gIHBhZGRpbmc6IDAuMnJlbTtcclxuICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1pbmspO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tdGlsZSk7XHJcbiAgY29sb3I6IHZhcigtLWluayk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDIwMG1zIGVhc2UsIGJvcmRlci1jb2xvciAyMDBtcyBlYXNlLCBjb2xvciAyMjBtcyBlYXNlLCBib3gtc2hhZG93IDgwbXMgZWFzZSwgdHJhbnNsYXRlIDgwbXMgZWFzZSwgc2NhbGUgMjQwbXMgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNTYsIDAuNjQsIDEpO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHJvdGF0ZTogdmFyKC0tdGlsdCk7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggMCB2YXIoLS1pbmspO1xyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG59XHJcbi5jZWxsOmFjdGl2ZSB7XHJcbiAgdHJhbnNsYXRlOiAwIDNweDtcclxuICBib3gtc2hhZG93OiAwIDFweCAwIHZhcigtLWluayk7XHJcbn1cclxuLyogU3VidGxlIHBlci1jZWxsIHRpbHQgc28gdGhlIGJvYXJkIGZlZWxzIGhhbmQtbGFpZCAqL1xyXG4ucm93Om50aC1jaGlsZChvZGQpICAuY2VsbDpudGgtY2hpbGQoN24rMSkgeyAtLXRpbHQ6IC0wLjhkZWc7IH1cclxuLnJvdzpudGgtY2hpbGQob2RkKSAgLmNlbGw6bnRoLWNoaWxkKDduKzMpIHsgLS10aWx0OiAgMS4yZGVnOyB9XHJcbi5yb3c6bnRoLWNoaWxkKG9kZCkgIC5jZWxsOm50aC1jaGlsZCg3bis1KSB7IC0tdGlsdDogLTAuNmRlZzsgfVxyXG4ucm93Om50aC1jaGlsZChvZGQpICAuY2VsbDpudGgtY2hpbGQoN24rNykgeyAtLXRpbHQ6ICAwLjlkZWc7IH1cclxuLnJvdzpudGgtY2hpbGQoZXZlbikgLmNlbGw6bnRoLWNoaWxkKDduKzIpIHsgLS10aWx0OiAgMC43ZGVnOyB9XHJcbi5yb3c6bnRoLWNoaWxkKGV2ZW4pIC5jZWxsOm50aC1jaGlsZCg3bis0KSB7IC0tdGlsdDogLTEuMWRlZzsgfVxyXG4ucm93Om50aC1jaGlsZChldmVuKSAuY2VsbDpudGgtY2hpbGQoN24rNikgeyAtLXRpbHQ6ICAwLjVkZWc7IH1cclxuXHJcbi5jZWxsLW5hbWUgeyBwb3NpdGlvbjogcmVsYXRpdmU7IHotaW5kZXg6IDE7IHBvaW50ZXItZXZlbnRzOiBub25lOyB9XHJcbi5wbGFjZW1lbnRzIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgaW5zZXQ6IDA7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgei1pbmRleDogMjtcclxufVxyXG4ucGxhY2VtZW50cyAuZHJvcHBlZCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogNTAlO1xyXG4gIGxlZnQ6IDUwJTtcclxuICAvKiBFeHBsaWNpdCBzcXVhcmUgYm94OiB0aGUgaG9zdCBlbGVtZW50IG9mIDxhcHAtdG9rZW4tYXZhdGFyPiBpcyBvdGhlcndpc2VcclxuICAgICBpbmxpbmUgYW5kIGdldHMgYSBub24tc3F1YXJlIGJvdW5kaW5nIGJveCBmcm9tIHRleHQgYmFzZWxpbmUsIHdoaWNoIG1ha2VzXHJcbiAgICAgYm9yZGVyLXJhZGl1czogNTAlIC8gdHJhbnNmb3JtOiBzY2FsZSByZW5kZXIgYXMgYW4gb3ZhbC4gKi9cclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogMjZweDtcclxuICBoZWlnaHQ6IDI2cHg7XHJcbiAgdHJhbnNsYXRlOiBjYWxjKC01MCUgKyB2YXIoLS1jaGlwLW94LCAwcHgpKSBjYWxjKC01MCUgKyB2YXIoLS1jaGlwLW95LCAwcHgpKTtcclxuICByb3RhdGU6IHZhcigtLWNoaXAtcm90LCAwZGVnKTtcclxuICBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgNXB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNTUpKTtcclxuICBhbmltYXRpb246IGNoaXAtZHJvcCA1MjBtcyBjdWJpYy1iZXppZXIoMC4yMiwgMS42LCAwLjM2LCAxKSBiYWNrd2FyZHM7XHJcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSA3MDBtcyBlYXNlLW91dCwgZmlsdGVyIDcwMG1zIGVhc2Utb3V0O1xyXG4gIG9wYWNpdHk6IDE7XHJcbn1cclxuLyogR2hvc3QgY2hpcCDigJQgYW5vdGhlciBwbGF5ZXIncyBwYXN0IGNvcnJlY3QgcGxhY2VtZW50IHRoYXQgbGluZ2VycyBvbiBteSBib2FyZC4gKi9cclxuLnBsYWNlbWVudHMgLmRyb3BwZWQuc3RpY2t5IHtcclxuICBvcGFjaXR5OiAwLjI7XHJcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDJweCAycHggcmdiYSgwLCAwLCAwLCAwLjM1KSk7XHJcbiAgei1pbmRleDogMDtcclxufVxyXG4vKiBPdXRsaW5lIGxpdmVzIG9uIHRoZSBpbm5lciByb3VuZCBhdmF0YXIgc28gaXQgZm9sbG93cyB0aGUgY2lyY2xlLCBub3QgdGhlXHJcbiAgIHNxdWFyZSBob3N0LiAqL1xyXG4ucGxhY2VtZW50cyA6Om5nLWRlZXAgLmF2YXRhci5zaXplLXNtIHtcclxuICB3aWR0aDogMjZweDtcclxuICBoZWlnaHQ6IDI2cHg7XHJcbiAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLWluayk7XHJcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XHJcbn1cclxuLyogRHJvcCBmcm9tIHRoZSBwbGF5ZXIncyBQT1Y6IGNoaXAgc3RhcnRzIGh1Z2UgYW5kIGJsdXJyeSAoYWJvdmUgdGhlIHNjcmVlbiksXHJcbiAgIHNjYWxlcyBkb3duIHRvIGl0cyBzY2F0dGVyIHNwb3Qgd2l0aCBhIHRpbnkgYm91bmNlICsgcm90YXRpb24gd29iYmxlLiAqL1xyXG5Aa2V5ZnJhbWVzIGNoaXAtZHJvcCB7XHJcbiAgMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLjQpO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMCA1cHggNHB4IHJnYmEoMCwgMCwgMCwgMC41NSkpIGJsdXIoNnB4KTtcclxuICB9XHJcbiAgNTUlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDVweCA0cHggcmdiYSgwLCAwLCAwLCAwLjU1KSkgYmx1cigwKTtcclxuICB9XHJcbiAgNjglIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Mikgcm90YXRlKDNkZWcpO1xyXG4gIH1cclxuICA4MiUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA0KSByb3RhdGUoLTJkZWcpO1xyXG4gIH1cclxuICA5MiUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk4KSByb3RhdGUoMWRlZyk7XHJcbiAgfVxyXG4gIDEwMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMGRlZyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKiA9PT09PSBCaW5nbyB3aW4gYmFubmVyID09PT09ICovXHJcbi5iaW5nby1iYW5uZXIge1xyXG4gIHBhZGRpbmc6IDEuNHJlbSAxLjI1cmVtIDEuMnJlbTtcclxuICBtYXJnaW46IDFyZW0gMDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgLyogUG9wcyBpbiBhZnRlciB0aGUgcmV2ZWFsIGJhbm5lciBoYXMgaGFkIHRpbWUgdG8gcGxheSAqL1xyXG4gIGFuaW1hdGlvbjogYmluZ28tcG9wIDYwMG1zIGN1YmljLWJlemllcigwLjM0LCAxLjU2LCAwLjY0LCAxKSAxMTAwbXMgYmFja3dhcmRzO1xyXG59XHJcbi5iaW5nby1iYW5uZXIubWluZSB7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LXllbGxvdyk7XHJcbiAgYW5pbWF0aW9uOlxyXG4gICAgYmluZ28tcG9wIDYwMG1zIGN1YmljLWJlemllcigwLjM0LCAxLjU2LCAwLjY0LCAxKSAxMTAwbXMgYmFja3dhcmRzLFxyXG4gICAgYmluZ28tc2hpbW1lciAxLjJzIGVhc2UtaW4tb3V0IDE3MDBtcyBpbmZpbml0ZTtcclxufVxyXG4uYmluZ28taGVhZGxpbmUge1xyXG4gIGZvbnQtZmFtaWx5OiAnUGVybWFuZW50IE1hcmtlcicsICdCZWxlcmVuJywgY3Vyc2l2ZTtcclxuICBmb250LXNpemU6IDIuOHJlbTtcclxuICBsaW5lLWhlaWdodDogMTtcclxuICBjb2xvcjogdmFyKC0taW5rKTtcclxuICB0ZXh0LXNoYWRvdzogMCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xyXG59XHJcbi5iaW5nby1zdWIge1xyXG4gIGZvbnQtZmFtaWx5OiAnQ2F2ZWF0JywgY3Vyc2l2ZTtcclxuICBmb250LXNpemU6IDEuNHJlbTtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIGNvbG9yOiB2YXIoLS1pbmspO1xyXG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcclxufVxyXG4uYmluZ28td2lubmVycyB7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxuICBwYWRkaW5nOiAwO1xyXG4gIG1hcmdpbjogMC45cmVtIDAgMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBnYXA6IDAuNXJlbTtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4uYmluZ28td2lubmVycyBsaSB7XHJcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDAuNDVyZW07XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tdGlsZSk7XHJcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0taW5rKTtcclxuICBib3JkZXItcmFkaXVzOiA5OTlweDtcclxuICBwYWRkaW5nOiAwLjJyZW0gMC43NXJlbSAwLjJyZW0gMC4yNXJlbTtcclxuICBmb250LWZhbWlseTogJ0NhdmVhdCcsIGN1cnNpdmU7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICBmb250LXNpemU6IDEuMDVyZW07XHJcbiAgYm94LXNoYWRvdzogMCAycHggMCB2YXIoLS1pbmspO1xyXG59XHJcbi5iaW5nby13aW5uZXJzIDo6bmctZGVlcCAuYXZhdGFyLnNpemUtc20geyB3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4OyBvdXRsaW5lOiAycHggc29saWQgdmFyKC0taW5rKTsgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IH1cclxuQGtleWZyYW1lcyBiaW5nby1wb3Age1xyXG4gIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuNSkgcm90YXRlKC02ZGVnKTsgb3BhY2l0eTogMDsgfVxyXG4gIDYwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpIHJvdGF0ZSgyZGVnKTsgIG9wYWNpdHk6IDE7IH1cclxuICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMCk7IG9wYWNpdHk6IDE7IH1cclxufVxyXG5Aa2V5ZnJhbWVzIGJpbmdvLXNoaW1tZXIge1xyXG4gIDAlLCAxMDAlIHsgYm94LXNoYWRvdzogMCA2cHggMCB2YXIoLS1pbmspLCAwIDAgMCAwIHJnYmEoMjU1LCAyMDksIDEwMiwgMCk7IH1cclxuICA1MCUgICAgICB7IGJveC1zaGFkb3c6IDAgNnB4IDAgdmFyKC0taW5rKSwgMCAwIDAgMTRweCByZ2JhKDI1NSwgMjA5LCAxMDIsIDAuNSk7IH1cclxufVxyXG5cclxuLyogQmluZ28gd2lubmluZy1saW5lIGhpZ2hsaWdodDogY2VsbHMgb24gbXkgd2lubmluZyByb3cvY29sL2RpYWcgZ2V0IGEgeWVsbG93IGdsb3cgKi9cclxuLmNlbGwud2lubmluZy1saW5lIHtcclxuICBib3gtc2hhZG93OiAwIDRweCAwIHZhcigtLWluayksIDAgMCAwIDRweCB2YXIoLS1hY2NlbnQteWVsbG93KTtcclxuICB6LWluZGV4OiAyO1xyXG4gIGFuaW1hdGlvbjogd2lubGluZS1wdWxzZSAxLjRzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xyXG59XHJcbkBrZXlmcmFtZXMgd2lubGluZS1wdWxzZSB7XHJcbiAgMCUsIDEwMCUgeyBib3gtc2hhZG93OiAwIDRweCAwIHZhcigtLWluayksIDAgMCAwIDRweCB2YXIoLS1hY2NlbnQteWVsbG93KTsgfVxyXG4gIDUwJSAgICAgIHsgYm94LXNoYWRvdzogMCA0cHggMCB2YXIoLS1pbmspLCAwIDAgMCA3cHggcmdiYSgyNTUsIDIwOSwgMTAyLCAwLjg1KTsgfVxyXG59XHJcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XHJcbiAgLnBsYWNlbWVudHMgLmRyb3BwZWQgeyBhbmltYXRpb246IG5vbmU7IH1cclxufVxyXG4uY2VsbC55b3UtZ3Vlc3NlZCB7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LXllbGxvdyk7XHJcbiAgY29sb3I6IHZhcigtLWluayk7XHJcbiAgYW5pbWF0aW9uOiBwdWxzZSA2MDBtcyBlYXNlLWluLW91dCBpbmZpbml0ZSBhbHRlcm5hdGU7XHJcbn1cclxuQGtleWZyYW1lcyBwdWxzZSB7XHJcbiAgZnJvbSB7IGJveC1zaGFkb3c6IDAgNHB4IDAgdmFyKC0taW5rKSwgMCAwIDAgMCByZ2JhKDI1NSwgMjA5LCAxMDIsIDAuNyk7IH1cclxuICB0byAgIHsgYm94LXNoYWRvdzogMCA0cHggMCB2YXIoLS1pbmspLCAwIDAgMCAxMHB4IHJnYmEoMjU1LCAyMDksIDEwMiwgMCk7IH1cclxufVxyXG4uY2VsbC5jb3JyZWN0IHtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQtZ3JlZW4pO1xyXG4gIGNvbG9yOiB2YXIoLS1pbmspO1xyXG4gIGFuaW1hdGlvbjogY2VsbC1jb3JyZWN0LXBvcCA3MDBtcyBjdWJpYy1iZXppZXIoMC4zNCwgMS41NiwgMC42NCwgMSk7XHJcbn1cclxuLmNlbGwuaW5jb3JyZWN0IHtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQtcmVkKTtcclxuICBjb2xvcjogdmFyKC0taW5rKTtcclxuICBhbmltYXRpb246IGNlbGwtaW5jb3JyZWN0LXNoYWtlIDQyMG1zIGN1YmljLWJlemllciguMzYsLjA3LC4xOSwuOTcpO1xyXG59XHJcbkBrZXlmcmFtZXMgY2VsbC1jb3JyZWN0LXBvcCB7XHJcbiAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMC45NSk7IGJveC1zaGFkb3c6IDAgMCAwIDAgcmdiYSg2LCAyMTQsIDE2MCwgMC45KTsgfVxyXG4gIDQwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMTIpOyBib3gtc2hhZG93OiAwIDAgMCAxNHB4IHJnYmEoNiwgMjE0LCAxNjAsIDApOyB9XHJcbiAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IGJveC1zaGFkb3c6IDAgMCAwIDAgcmdiYSg2LCAyMTQsIDE2MCwgMCksIDAgMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjI1KTsgfVxyXG59XHJcbkBrZXlmcmFtZXMgY2VsbC1pbmNvcnJlY3Qtc2hha2Uge1xyXG4gIDEwJSwgOTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xcHgpOyB9XHJcbiAgMjAlLCA4MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMnB4KTsgfVxyXG4gIDMwJSwgNTAlLCA3MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTNweCk7IH1cclxuICA0MCUsIDYwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgzcHgpOyB9XHJcbn1cclxuLmNlbGwuaXMtdHJ1dGg6bm90KC5jb3JyZWN0KSB7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggMCB2YXIoLS1pbmspLCAwIDAgMCAzcHggdmFyKC0tYWNjZW50LWdyZWVuKTtcclxufVxyXG4uY2VsbC5oaWdobGlnaHRlZDpub3QoLnlvdS1ndWVzc2VkKTpub3QoLmNvcnJlY3QpOm5vdCguaW5jb3JyZWN0KTpub3QoLmlzLXRydXRoKSB7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tcGFwZXItd2FybSk7XHJcbn1cclxuLyogQ2VsbHMgd2hvc2UgbmFtZSBpc24ndCBvbmUgb2YgdGhlIGZvdXIgY3VycmVudCBhbnN3ZXJzIHNocmluayArIGdyZXkgb3V0IHNvXHJcbiAgIHRoZSBmb3VyIHZhbGlkIGNlbGxzIGRvbWluYXRlLiBDb29sIG5ldXRyYWwgZ3JleSBibGVuZHMgd2l0aCB0aGUgZ3JhZGllbnRcclxuICAgd2l0aG91dCByZWFkaW5nIGJyb3duL3B1a2UuIFN0YXRlIGNsYXNzZXMgb3ZlcnJpZGUgdmlhIDpub3QoKS4gKi9cclxuLmNlbGwudW5hdmFpbGFibGU6bm90KC55b3UtZ3Vlc3NlZCk6bm90KC5jb3JyZWN0KTpub3QoLmluY29ycmVjdCk6bm90KC5oaWdobGlnaHRlZCkge1xyXG4gIHNjYWxlOiAwLjgyO1xyXG4gIGJhY2tncm91bmQ6ICNkNGQwZDg7XHJcbiAgY29sb3I6IHJnYmEoMjYsIDE5LCA0OCwgMC41KTtcclxufVxyXG5cclxuLyogUmV2ZWFsIGJhbm5lciDigJQgc3RpY2tlciBib29rIGNhcmQgKi9cclxuLnJldmVhbC1iYW5uZXIge1xyXG4gIHBhZGRpbmc6IDEuMXJlbSAxLjI1cmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0taW5rKTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1mYW1pbHk6ICdQZXJtYW5lbnQgTWFya2VyJywgJ0JlbGVyZW4nLCBjdXJzaXZlO1xyXG4gIGZvbnQtc2l6ZTogMnJlbTtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjAyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1wYXBlcik7XHJcbiAgY29sb3I6IHZhcigtLWluayk7XHJcbiAgYm94LXNoYWRvdzogMCA2cHggMCB2YXIoLS1pbmspO1xyXG4gIGFuaW1hdGlvbjogcmV2ZWFsLXBvcCA0NTBtcyBjdWJpYy1iZXppZXIoMC4zNCwgMS41NiwgMC42NCwgMSk7XHJcbn1cclxuLnJldmVhbC1iYW5uZXIud2luIHtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQtZ3JlZW4pO1xyXG4gIGFuaW1hdGlvbjpcclxuICAgIHJldmVhbC1wb3AgNDUwbXMgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNTYsIDAuNjQsIDEpLFxyXG4gICAgd2luLWdsb3cgMS40cyBlYXNlLW91dCA0NTBtcyAxO1xyXG59XHJcbi5yZXZlYWwtYmFubmVyLmxvc2Uge1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1yZWQpO1xyXG4gIGFuaW1hdGlvbjpcclxuICAgIHJldmVhbC1wb3AgNDUwbXMgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNTYsIDAuNjQsIDEpLFxyXG4gICAgbG9zZS1zaGFrZSA0MjBtcyBjdWJpYy1iZXppZXIoLjM2LC4wNywuMTksLjk3KSA0NTBtcyAxO1xyXG59XHJcbi5yZXZlYWwtdHJ1dGgge1xyXG4gIGZvbnQtZmFtaWx5OiAnQ2F2ZWF0JywgY3Vyc2l2ZTtcclxuICBmb250LXNpemU6IDEuM3JlbTtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIG1hcmdpbi10b3A6IDAuMjVyZW07XHJcbiAgb3BhY2l0eTogMC45NTtcclxuICBsZXR0ZXItc3BhY2luZzogMDtcclxufVxyXG5Aa2V5ZnJhbWVzIHJldmVhbC1wb3Age1xyXG4gIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuNykgdHJhbnNsYXRlWSgtMTJweCk7IG9wYWNpdHk6IDA7IH1cclxuICA2MCUgIHsgdHJhbnNmb3JtOiBzY2FsZSgxLjA2KSB0cmFuc2xhdGVZKDApOyBvcGFjaXR5OiAxOyB9XHJcbiAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSkgdHJhbnNsYXRlWSgwKTsgb3BhY2l0eTogMTsgfVxyXG59XHJcbkBrZXlmcmFtZXMgd2luLWdsb3cge1xyXG4gIDAlLCAxMDAlIHsgYm94LXNoYWRvdzogMCAwIDAgMCByZ2JhKDYsIDIxNCwgMTYwLCAwKTsgfVxyXG4gIDUwJSAgICAgIHsgYm94LXNoYWRvdzogMCAwIDAgMThweCByZ2JhKDYsIDIxNCwgMTYwLCAwLjM1KTsgfVxyXG59XHJcbkBrZXlmcmFtZXMgbG9zZS1zaGFrZSB7XHJcbiAgMTAlLCA5MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTJweCk7IH1cclxuICAyMCUsIDgwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgzcHgpOyB9XHJcbiAgMzAlLCA1MCUsIDcwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNXB4KTsgfVxyXG4gIDQwJSwgNjAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDVweCk7IH1cclxufVxyXG5cclxuLyogQmV0d2Vlbi1xdW90ZSB3YWl0aW5nIGNhcmQgKi9cclxuLndhaXRpbmctY2FyZCB7XHJcbiAgY29sb3I6IHZhcigtLWluayk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMC42cmVtO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDAuOHJlbSAxcmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgY29sb3I6IHZhcigtLXRleHQtZGltKTtcclxuICBmb250LXNpemU6IDAuODVyZW07XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuLndhaXRpbmctZG90IHtcclxuICB3aWR0aDogOHB4O1xyXG4gIGhlaWdodDogOHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQteWVsbG93KTtcclxuICBib3gtc2hhZG93OiAwIDAgNnB4IHJnYmEoMjU1LCAyMDksIDEwMiwgMC42KTtcclxuICBhbmltYXRpb246IHdhaXRpbmctcHVsc2UgMS40cyBlYXNlLWluLW91dCBpbmZpbml0ZTtcclxufVxyXG5Aa2V5ZnJhbWVzIHdhaXRpbmctcHVsc2Uge1xyXG4gIDAlLCAxMDAlIHsgb3BhY2l0eTogMC40OyB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7IH1cclxuICA1MCUgICAgICB7IG9wYWNpdHk6IDE7ICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpOyB9XHJcbn1cclxuXHJcbi5sb2JieS1wbGF5ZXJzIGxpIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAxMHB4O1xyXG59XHJcbi5sb2JieS1wbGF5ZXItbmFtZSB7IGZsZXg6IDE7IH1cclxuXHJcbi8qIFNjb3JlIGJhciAqL1xyXG4uc2NvcmUtYmFyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIHBhZGRpbmc6IDAuNzVyZW0gMS4yNXJlbTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy1jYXJkKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgcG9zaXRpb246IHN0aWNreTtcclxuICBib3R0b206IDAuNXJlbTtcclxufVxyXG4uc2NvcmUtbGFiZWwge1xyXG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcclxuICBsZXR0ZXItc3BhY2luZzogMC4xZW07XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBjb2xvcjogdmFyKC0tdGV4dC1kaW0pO1xyXG59XHJcbi5zY29yZS12YWx1ZSB7XHJcbiAgZm9udC1zaXplOiAxLjZyZW07XHJcbiAgZm9udC13ZWlnaHQ6IDgwMDtcclxuICBjb2xvcjogdmFyKC0tYWNjZW50LXllbGxvdyk7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 2440:
/*!*****************************************!*\
  !*** ./src/app/pipes/dots-pipe.pipe.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DotsPipe": () => (/* binding */ DotsPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class DotsPipe {
    constructor() {
        this.currentStep = 0; // Tracks the current number of dots (0, 1, 2, 3)
        this.valueWithDots = ''; // Cached value to avoid unnecessary computations
    }
    transform(value) {
        // If the interval hasn't been started, initialize it
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.currentStep = (this.currentStep % 3) + 1; // Cycle through 1, 2, 3
                this.valueWithDots = `${value}${'.'.repeat(this.currentStep)}`;
            }, 500); // Adjust interval as needed
        }
        return this.valueWithDots || value; // Return the cached value with dots
    }
    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId); // Cleanup when the pipe is destroyed
        }
    }
}
DotsPipe.ɵfac = function DotsPipe_Factory(t) { return new (t || DotsPipe)(); };
DotsPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "dotsPipe", type: DotsPipe, pure: false });


/***/ }),

/***/ 382:
/*!************************************************!*\
  !*** ./src/app/services/game-state.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameStateService": () => (/* binding */ GameStateService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


const initial = {
    phase: 'unknown', me: null, card: null, players: [], leaderboard: [],
    currentQuote: null, yourGuess: null, lastReveal: null, placements: {},
    bingoWinners: null,
};
class GameStateService {
    constructor() {
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(initial);
        this.state$ = this.subject.asObservable();
    }
    snapshot() { return this.subject.value; }
    apply(msg) {
        var _a, _b, _c, _d, _e;
        const s = this.subject.value;
        switch (msg.type) {
            case 'joined':
                this.subject.next(Object.assign(Object.assign({}, s), { phase: msg.phase, me: { playerId: msg.playerId, name: msg.name, cardId: msg.cardId, score: msg.score }, card: msg.card, players: msg.players, leaderboard: msg.leaderboard, currentQuote: msg.currentQuote, yourGuess: msg.yourGuess, lastReveal: null }));
                return;
            case 'host_state':
                this.subject.next(Object.assign(Object.assign({}, s), { phase: msg.phase, players: msg.players, leaderboard: msg.leaderboard, currentQuote: msg.currentQuote, card: msg.card, yourGuess: null, lastReveal: null }));
                return;
            case 'lobby_update':
                this.subject.next(Object.assign(Object.assign({}, s), { players: msg.players }));
                return;
            case 'card_started':
                this.subject.next(Object.assign(Object.assign({}, s), { phase: 'live', leaderboard: msg.leaderboard, card: msg.card, currentQuote: null, yourGuess: null, lastReveal: null, placements: {}, bingoWinners: null }));
                return;
            case 'quote':
                this.subject.next(Object.assign(Object.assign({}, s), { currentQuote: { index: msg.index, quote: msg.quote, possibleAnswers: msg.possibleAnswers }, yourGuess: null, lastReveal: null, placements: {} }));
                return;
            case 'guess_ack':
                if (((_a = s.currentQuote) === null || _a === void 0 ? void 0 : _a.index) === msg.quoteIndex) {
                    this.subject.next(Object.assign(Object.assign({}, s), { yourGuess: msg.guess }));
                }
                return;
            case 'guess_placed':
                if (((_b = s.currentQuote) === null || _b === void 0 ? void 0 : _b.index) === msg.quoteIndex) {
                    this.subject.next(Object.assign(Object.assign({}, s), { placements: Object.assign(Object.assign({}, s.placements), { [msg.playerId]: { row: msg.row, col: msg.col } }) }));
                }
                return;
            case 'guess_rejected':
                if (((_c = s.currentQuote) === null || _c === void 0 ? void 0 : _c.index) === msg.quoteIndex) {
                    this.subject.next(Object.assign(Object.assign({}, s), { yourGuess: null }));
                }
                return;
            case 'reveal': {
                // Wrong guessers' chips clear off the board on reveal; correct guessers' chips stay.
                const correctIds = new Set(msg.perPlayer.filter(p => p.correct).map(p => p.playerId));
                const keptPlacements = {};
                for (const pid of Object.keys(s.placements)) {
                    if (correctIds.has(pid))
                        keptPlacements[pid] = s.placements[pid];
                }
                this.subject.next(Object.assign(Object.assign({}, s), { leaderboard: msg.leaderboard, lastReveal: { index: msg.index, truth: msg.truth, perPlayer: msg.perPlayer }, placements: keptPlacements, me: s.me ? Object.assign(Object.assign({}, s.me), { score: (_e = (_d = msg.leaderboard.find(l => l.playerId === s.me.playerId)) === null || _d === void 0 ? void 0 : _d.score) !== null && _e !== void 0 ? _e : s.me.score }) : s.me }));
                return;
            }
            case 'returned_to_lobby':
                this.subject.next(Object.assign(Object.assign({}, s), { phase: 'lobby', card: null, currentQuote: null, yourGuess: null, lastReveal: null, players: msg.players, leaderboard: [], placements: {}, bingoWinners: null }));
                return;
            case 'bingo':
                this.subject.next(Object.assign(Object.assign({}, s), { bingoWinners: msg.winners }));
                return;
            case 'pick_rejected':
                console.warn('pick rejected:', msg.reason);
                return;
            case 'lobby_cleared':
                this.subject.next(Object.assign(Object.assign({}, initial), { phase: 'lobby' }));
                return;
            case 'error':
                console.error('server error', msg.reason);
                return;
        }
    }
}
GameStateService.ɵfac = function GameStateService_Factory(t) { return new (t || GameStateService)(); };
GameStateService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GameStateService, factory: GameStateService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9352:
/*!**********************************************!*\
  !*** ./src/app/services/identity.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IdentityService": () => (/* binding */ IdentityService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


const KEY = 'sussy-bingo:identity';
class IdentityService {
    constructor() {
        let initial = null;
        try {
            const raw = localStorage.getItem(KEY);
            if (raw)
                initial = JSON.parse(raw);
        }
        catch (_a) { }
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(initial);
        this.identity$ = this.subject.asObservable();
    }
    snapshot() { return this.subject.value; }
    save(id) {
        localStorage.setItem(KEY, JSON.stringify(id));
        this.subject.next(id);
    }
    clear() {
        localStorage.removeItem(KEY);
        this.subject.next(null);
    }
}
IdentityService.ɵfac = function IdentityService_Factory(t) { return new (t || IdentityService)(); };
IdentityService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: IdentityService, factory: IdentityService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 6372:
/*!**************************************************!*\
  !*** ./src/app/services/quote-ingest.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QuoteIngestService": () => (/* binding */ QuoteIngestService)
/* harmony export */ });
/* harmony import */ var A_Coding_sussy_bingo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4363);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8784);




class QuoteIngestService {
  constructor(http) {
    this.http = http;
    this.nickNameMap = {
      'Connor': ['Con (edited)', 'Cumnor', 'Connor (edited)', 'Con', 'Connor'],
      'Andrew': ['Andrew', 'Andrew (Me) (edited)', 'Andrew (edited)', 'Andrew (me)', 'Golgari king', 'Steven + andrew and different points', 'Andrews', ' andrew', 'andrew', 'Steven + Andrew and Different Points (edited)'],
      'Shipley': ['Shipley to Steve', 'Ship (Text)', 'Shipley', 'Ship, inventor of rubber bands', 'Ship', 'Shiply', 'Shipley to steve', 'Shiply, probably', 'Ship (text)', 'shipley', 'Ship, Inventor of Rubber Bands', '- Ship', 'Ship (edited)'],
      'Tony': ['tony', 'Tony Rat (in response to a banned card) (edited)', 'Tony (edited)', 'Tony', 'Tony 2022', 'Tony rat (in response to a banned card)', '[tony]'],
      'Rumtin': ['Rumtin', 'Rumtin?!', 'Rumtin, in response to a date', 'Krockacondor', 'Rumtin (completely umprompted after the longest sweatest game)e'],
      'Matty': ['Matty?', 'Matty', 'Matty (edited)'],
      'Will': ['Will', 'Will (off books)'],
      'Doug': ['Doug', 'Doug (late night)'],
      'Stephen': ['Stephen', 'Steven + andrew and different points', 'Steven + Andrew and Different Points (edited)'],
      'Brandon': ['Brandon'],
      'John': ['John'],
      'David': ['David'],
      'Daffy': ['Daffy']
    };
  }

  load() {
    var _this = this;

    return (0,A_Coding_sussy_bingo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const text = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.firstValueFrom)(_this.http.get('assets/ingest_file.txt', {
        responseType: 'text'
      }));
      return _this.parse(text);
    })();
  }

  parse(text) {
    var _a; // Quote body cannot contain newlines or other quote chars. This stops a single
    // regex match from spanning multiple Discord lines and accidentally capturing
    // timestamps / @mentions / the next message's metadata.


    const regex = /([“"][^"“”\n\r]+[”"])\s?-(.*)/g;
    const quotes = [];
    const totals = {};

    for (const m of text.matchAll(regex)) {
      const rawName = m[2].trim();
      const canonical = this.canonicalize(rawName);
      if (!canonical) continue;
      const cleaned = m[1].replace(/^[“"]+|[”"]+$/g, '').trim();
      if (!this.isPlayableQuote(cleaned)) continue;
      quotes.push({
        quote: cleaned,
        rawName,
        canonicalName: canonical
      });
      totals[canonical] = ((_a = totals[canonical]) !== null && _a !== void 0 ? _a : 0) + 1;
    }

    const weights = Object.entries(totals).map(([name, weight]) => ({
      name,
      weight
    })).sort((a, b) => b.weight - a.weight);
    return {
      quotes,
      weights
    };
  }
  /** Defensive post-filter for quotes that survived the regex but read badly on the TV. */


  isPlayableQuote(quote) {
    if (/[\r\n]/.test(quote)) return false; // multi-line artifact

    if (quote.length < 2 || quote.length > 280) return false;
    if (/^\s*$/.test(quote)) return false; // pure whitespace

    if (!/[A-Za-z]/.test(quote)) return false; // no letters (e.g. "...")

    if (/\[\d{1,2}:\d{2}\s*(AM|PM)?\]/i.test(quote)) return false; // Discord timestamp

    if (/@\S+/.test(quote)) return false; // contains a mention

    return true;
  }

  canonicalize(rawName) {
    let name = rawName;
    if (name.endsWith('(edited)')) name = name.slice(0, -'(edited)'.length).trim();
    if (name.startsWith('- ')) name = name.slice(2);
    const lc = name.toLocaleLowerCase();

    for (const [canon, aliases] of Object.entries(this.nickNameMap)) {
      if (aliases.some(a => a.toLocaleLowerCase() === lc)) return canon;
    }

    return null;
  }

}

QuoteIngestService.ɵfac = function QuoteIngestService_Factory(t) {
  return new (t || QuoteIngestService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};

QuoteIngestService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: QuoteIngestService,
  factory: QuoteIngestService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 699:
/*!********************************************!*\
  !*** ./src/app/services/tokens.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TokensService": () => (/* binding */ TokensService)
/* harmony export */ });
/* harmony import */ var A_Coding_sussy_bingo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4363);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8784);




class TokensService {
  constructor(http) {
    this.http = http;
    this.tokens = [];
    this.byIdMap = new Map();
  }

  load() {
    var _this = this;

    return (0,A_Coding_sussy_bingo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const list = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.firstValueFrom)(_this.http.get('assets/tokens.json'));
        _this.tokens = (list !== null && list !== void 0 ? list : []).map(t => Object.assign(Object.assign({}, t), {
          name: t.name.split(/\s+/)[0]
        }));
      } catch (_a) {
        _this.tokens = [];
      }

      _this.byIdMap.clear();

      for (const t of _this.tokens) _this.byIdMap.set(t.id, t);
    })();
  }

  byId(tokenId) {
    if (!tokenId) return undefined;
    return this.byIdMap.get(tokenId);
  }

}

TokensService.ɵfac = function TokensService_Factory(t) {
  return new (t || TokensService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};

TokensService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: TokensService,
  factory: TokensService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 4509:
/*!************************************************!*\
  !*** ./src/app/services/web-socket.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSocketService": () => (/* binding */ WebSocketService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class WebSocketService {
    constructor() {
        this.url = '';
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
        this.queue = [];
        this.retryMs = 250;
        this.retryMaxMs = 4000;
        this.intentionallyClosed = false;
        this.isFirstConnect = true;
    }
    connect(url) {
        this.url = url;
        this.intentionallyClosed = false;
        this.open();
    }
    disconnect() {
        var _a;
        this.intentionallyClosed = true;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
    }
    send(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ action: 'msg', body: message }));
        }
        else {
            this.queue.push(message);
        }
    }
    get messages$() {
        return this.subject.asObservable();
    }
    open() {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            this.retryMs = 250;
            const wasReconnect = !this.isFirstConnect;
            this.isFirstConnect = false;
            while (this.queue.length) {
                this.socket.send(JSON.stringify({ action: 'msg', body: this.queue.shift() }));
            }
            if (wasReconnect && this.onReconnect)
                this.onReconnect();
        };
        this.socket.onmessage = (e) => {
            try {
                this.subject.next(JSON.parse(e.data));
            }
            catch (_a) { }
        };
        this.socket.onclose = () => {
            if (this.intentionallyClosed)
                return;
            const delay = this.retryMs;
            this.retryMs = Math.min(this.retryMs * 2, this.retryMaxMs);
            setTimeout(() => this.open(), delay);
        };
        this.socket.onerror = () => { };
    }
}
WebSocketService.ɵfac = function WebSocketService_Factory(t) { return new (t || WebSocketService)(); };
WebSocketService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: WebSocketService, factory: WebSocketService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    snsTopicArn: 'arn:aws:sns:us-east-1:123456789012:game-notifications',
    serverUrl: 'http://your-server-url.com/api', // Replace with your backend server URL
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map