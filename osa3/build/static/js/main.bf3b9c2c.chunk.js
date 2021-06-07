(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var r=t(15),c=t.n(r),o=t(6),a=t(3),i=t(1),u=t(0),l=function(e){return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Add a new"}),Object(u.jsxs)("form",{onSubmit:e.addPerson,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"Add"})})]})]})},s=function(e){var n=e.person,t=e.handleDelete;return Object(u.jsxs)("li",{children:[n.name," ",n.number," ",Object(u.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})},d=function(e){var n=e.persons,t=e.newFilter,r=e.handleDelete;return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)("ul",{children:n.filter((function(e){return e.name.toUpperCase().match(t.toUpperCase())})).map((function(e){return Object(u.jsx)(s,{person:e,handleDelete:r},e.name)}))})]})},j=function(e){var n=e.newFilter,t=e.handleFilterChange;return Object(u.jsxs)("p",{children:["filter shown with ",Object(u.jsx)("input",{value:n,onChange:t})]})},h=t(4),b=t.n(h),f="/api/persons",m=function(){return b.a.get(f).then((function(e){return e.data}))},p=function(e){return b.a.post(f,e).then((function(e){return e.data}))},O=function(e){return b.a.delete("".concat(f,"/").concat(e))},x=function(e,n){return b.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){var n=e.message,t={color:e.isError?"red":"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return null===n?null:Object(u.jsx)("div",{style:t,children:n.display})},v=function(){var e=Object(i.useState)([]),n=Object(a.a)(e,2),t=n[0],r=n[1],c=Object(i.useState)(""),s=Object(a.a)(c,2),h=s[0],b=s[1],f=Object(i.useState)(""),v=Object(a.a)(f,2),w=v[0],y=v[1],C=Object(i.useState)(""),E=Object(a.a)(C,2),N=E[0],S=E[1],D=Object(i.useState)(null),k=Object(a.a)(D,2),F=k[0],T=k[1],A=null===F?null:F.isError;Object(i.useEffect)((function(){m().then((function(e){r(e)}))}),[]);return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(g,{message:F,isError:A}),Object(u.jsx)(j,{newFilter:N,handleFilterChange:function(e){S(e.target.value)}}),Object(u.jsx)(l,{addPerson:function(e){(e.preventDefault(),function(e,n){return e.some((function(e){return e.name===n}))}(t,h))?window.confirm("".concat(h," is already added to phonebook, replace the old number with new one?"))&&function(e){var n=t.find((function(n){return n.name===e})),c=Object(o.a)(Object(o.a)({},n),{},{number:w});x(c.id,c).then((function(e){r(t.map((function(t){return t.id!==n.id?t:e}))),T({display:"Updated number for ".concat(n.name),isError:!1}),setTimeout((function(){T(null)}),3e3)})).catch((function(e){T({display:"The person ".concat(n.name," was already deleted from server"),isError:!0}),setTimeout((function(){T(null)}),3e3)})),b(""),y("")}(h):(p({name:h,number:w}).then((function(e){r(t.concat(e)),T({display:"Added ".concat(e.name),isError:!1}),setTimeout((function(){T(null)}),3e3)})).catch((function(e){T({display:"".concat(e.response.data.error),isError:!0}),setTimeout((function(){T(null)}),3e3)})),b(""),y(""))},newName:h,handleNameChange:function(e){b(e.target.value)},newNumber:w,handleNumberChange:function(e){y(e.target.value)}}),Object(u.jsx)(d,{persons:t,newFilter:N,handleDelete:function(e){window.confirm("Delete ".concat(e.name," from the list?"))&&O(e.id).then((function(n){console.log(n),console.log(n.data);var c=t.filter((function(n){return n.id!==e.id}));r(c),T({display:"Deleted ".concat(e.name),isError:!1}),setTimeout((function(){T(null)}),3e3)}))}})]})};c.a.render(Object(u.jsx)(v,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.bf3b9c2c.chunk.js.map