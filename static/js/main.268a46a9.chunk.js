(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[0],{112:function(e,t){},114:function(e,t){},128:function(e,t,n){"use strict";n.r(t);var r=n(18),c=n(14),a=n.n(c),s=n(39),o=n.n(s),i=n(40),u=n.n(i);function l(){return(l=Object(r.a)(a.a.mark((function e(t){var n,r,c,s,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=new u.a.Agent({rejectUnauthorized:!1}),t||console.log("No country code exists for the selected country"),r="https://restcountries.com/v3.1/alpha/".concat(t),e.next=6,o.a.get(r,{httpsAgent:n});case 6:return c=e.sent,s=c.data[0],i={name:s.name.common,borders:s.borders,capital:s.capital,landlocked:s.landlocked,map:s.maps.googleMaps,population:s.population,flags:s.flags.png,region:s.region,subregion:s.subregion},e.abrupt("return",i);case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}t.default=function(e){return l.apply(this,arguments)}},129:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(36),s=n.n(a),o=n(18),i=n(11),u=n(14),l=n.n(u),j=n(135),d=n(30),b=n(134),p=n(41),h=(n(46),n(3));var O=function(e){var t=Object(r.useState)(!1),n=Object(i.a)(t,2),c=n[0],a=n[1],s=Object(r.useState)(!1),o=Object(i.a)(s,2),u=o[0],l=o[1],O=Object(r.useState)(0),f=Object(i.a)(O,2),g=f[0],x=f[1],m=Object(r.useState)([]),v=Object(i.a)(m,2),y=v[0],S=v[1],w=Object(r.useState)(!1),k=Object(i.a)(w,2),C=k[0],A=k[1],E=Object(r.useState)(!1),M=Object(i.a)(E,2),T=M[0],U=M[1],F=Object(r.useState)(!0),N=Object(i.a)(F,2),Y=N[0],I=N[1],L=Object(r.useState)(""),W=Object(i.a)(L,2),B=(W[0],W[1]),z=Object(r.useState)([]),G=Object(i.a)(z,2),P=G[0],q=G[1];return Object(h.jsxs)("div",{id:"country-guesser",className:"component",children:[!T&&!u&&Object(h.jsxs)("div",{id:"country-info",children:[Object(h.jsx)("h2",{children:"Mystery Country"}),Object(h.jsxs)("p",{children:["Population = ",e.population]}),g>=1&&Object(h.jsxs)("p",{children:["Region = ",e.region]}),g>=2&&Object(h.jsxs)("p",{children:["Landlocked = ",e.landlocked]}),g>=3&&Object(h.jsxs)("p",{children:["Sub region = ",e.subregion]}),g>=4&&Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{children:"Flag: "}),Object(h.jsx)("img",{style:{border:"solid"},src:e.flag,alt:"Country Flag"})]}),g>=5&&Object(h.jsxs)("p",{children:["Capital city/cities = ",e.capital]})]}),Object(h.jsx)("div",{id:"country-form",children:!u&&!T&&Object(h.jsxs)(b.a,{onSubmit:function(t){t.preventDefault(),B("");var n=t.target[0].value.toLowerCase().trim(),r=!1;n.length>0?e.possibleCountries.find((function(e){e.label.toLowerCase()===n?(I(!0),r=!0):(A(!1),a(!1),I(!1))})):(I(!1),a(!1),A(!1)),r&&(I(!0),y.includes(n)?A(!0):(A(!1),a(!0),n===e.name.toLowerCase()?l(!0):(x(g+1),l(!1),5===g&&U(!0)),S([].concat(Object(d.a)(y),[n]))))},children:[Object(h.jsx)("br",{}),Object(h.jsx)(r.Fragment,{children:Object(h.jsxs)(b.a.Group,{className:"mb-3",children:[Object(h.jsx)(b.a.Label,{children:"Guess the country"}),Object(h.jsx)(p.a,{id:"country-search",onChange:q,options:e.possibleCountries,placeholder:"Select your country",selected:P})]})}),Object(h.jsx)(j.a,{variant:"primary",type:"submit",children:"Guess"})]})}),Object(h.jsx)("br",{}),Object(h.jsxs)("div",{id:"invalid-guess-feedback",children:[C&&Object(h.jsx)("p",{style:{color:"brown"},children:"You've already tried that country!"}),!Y&&Object(h.jsx)("p",{style:{color:"brown"},children:"Enter a valid country name"})]}),!u&&c&&!T&&Object(h.jsxs)("div",{id:"guess-feedback",children:[!C&&Object(h.jsxs)("p",{style:{color:"red"},children:["Incorrect! That was attempt number ",g,"/6."]}),Object(h.jsxs)("p",{children:["Your guesses so far: ",y.toString()]})]}),u&&!T&&Object(h.jsxs)("div",{id:"successful-guess",children:[0===g&&Object(h.jsxs)("h5",{children:["Amazing! You got ",Object(h.jsx)("a",{href:e.map,children:e.name})," in one!"]}),g>0&&Object(h.jsxs)("h5",{children:["Well done! It took you ",g+1," attempts to get ",Object(h.jsx)("a",{href:e.map,children:e.name}),"!"]}),Object(h.jsx)("img",{style:{border:"solid"},src:e.flag,alt:"Country Flag"}),Object(h.jsxs)("p",{children:["Your answer history was: ",y.toString()]})]}),T&&Object(h.jsxs)("div",{id:"incorrect-guess",children:[Object(h.jsx)("p",{style:{color:"red"},children:"YOU LOST"}),Object(h.jsxs)("p",{children:["The answer was ",Object(h.jsx)("a",{href:e.map,children:e.name})]}),Object(h.jsx)("img",{style:{border:"solid"},src:e.flag,alt:"Country Flag"})]})]})};var f=n(90),g=n(128);var x=function(){var e,t=Object(r.useState)(),n=Object(i.a)(t,2),c=n[0],a=n[1],s=Object(r.useState)(),u=Object(i.a)(s,2),d=u[0],b=u[1],p=Object(r.useState)(),x=Object(i.a)(p,2),m=(x[0],x[1]),v=Object(r.useState)(!1),y=Object(i.a)(v,2),S=y[0],w=y[1],k=Object(r.useState)(!1),C=Object(i.a)(k,2),A=C[0],E=C[1];function M(){return(M=Object(o.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T();case 3:return t=e.sent,n=F(t),e.next=7,g(n);case 7:r=e.sent,a(r),E(!0),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),w(!0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function T(){return U.apply(this,arguments)}function U(){return U=Object(o.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f();case 3:return t=e.sent,n=t.countriesArray,r=[],n.forEach((function(e){var t={label:e};r.push(t)})),b(r),e.abrupt("return",t);case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])}))),U.apply(this,arguments)}function F(e){var t=e.countriesArray,n=t[Math.floor(Math.random()*t.length)],r=e.countryCodeMapping;m(r);var c=r.find((function(e){return e.name===n}));return c.code}return Object(h.jsxs)("div",{id:"country",children:[!A&&Object(h.jsx)(j.a,{variant:"primary",size:"lg",onClick:function(){return M.apply(this,arguments)},children:"Press to begin the fun!"}),S&&Object(h.jsx)("p",{children:"Error found when finding country. Please try again"}),A&&Object(h.jsx)(O,{name:c.name,population:(e=c.population,e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")),flag:c.flags,landlocked:c.landlocked?"Yes":"No",region:c.region,subregion:c.subregion,map:c.map,capital:c.capital.toString(),possibleCountries:d})]})};var m=function(){return Object(h.jsxs)("div",{id:"app",children:[Object(h.jsx)("h1",{children:"FUN WITH COUNTRIES"}),Object(h.jsx)(x,{}),Object(h.jsx)("link",{rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",integrity:"sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3",crossOrigin:"anonymous"})]})};s.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(m,{})}),document.getElementById("root"))},90:function(e,t,n){"use strict";n.r(t);var r=n(18),c=n(14),a=n.n(c),s=n(39),o=n.n(s),i=n(40),u=n.n(i);function l(){return(l=Object(r.a)(a.a.mark((function e(){var t,n,r,c,s,i,l,j;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=new u.a.Agent({rejectUnauthorized:!1}),e.next=4,o.a.get("https://restcountries.com/v3.1/all",{httpsAgent:t});case 4:return n=e.sent,r=n.data,c=[],s=[],i=[],l=["Taiwan","Greenland","Palestine","Kosovo","Western Sahara"],r.forEach((function(e){var t=e.name.common,n=e.name.official;if(c.push(n),e.unMember&&e.independent||l.includes(t)){s.push(t);var r=e.cioc;r||(r=e.cca3);var a={name:t,code:r};i.push(a)}})),j={officialCountryNames:c.sort(),countriesArray:s.sort(),countryCodeMapping:i},e.abrupt("return",j);case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})))).apply(this,arguments)}t.default=function(){return l.apply(this,arguments)}}},[[129,1,2]]]);
//# sourceMappingURL=main.268a46a9.chunk.js.map