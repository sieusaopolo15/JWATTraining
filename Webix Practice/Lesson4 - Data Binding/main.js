    //BINDING WITH DEFAULT DATA
// webix.ready(function () {
//     webix.ui({
//         rows: [
//             {
//                 view: "list", id: "list1", template: "#title# - #year#", data: filmset,
//                 select: true,
//                 defaultData: {
//                     title: "Not selected",
//                     year: 0
//                 } 
//             },
//             { view: "template", id: "template1", template: "#title# - #year#" }
//         ]
//     });
//     $$("template1").bind($$("list1"));
// });

    //BINDING WITH FORM
var datatable = {
    view: "datatable", id: "datatable1",
    columns: [
        { id: "id", header: "#", width: 40 },
        { id: "title", header: "Film Title", fillspace: true },
        { id: "year", header: "Released", width: 80 },
    ],
    select: true, autoheight: true, scrollX: true,
    data: filmset
};
var form = {
    view: "form", id: "form1", scroll: false,
    elements: [
        { view: "text", name: "id", label: "ID", disabled: true },
        { view: "text", name: "title", label: "Film Title" },
        { view: "text", name: "year", label: "Released" },
        { view: "text", name: "rating", label: "Rank" },
        { view: "text", name: "vote", label: "Vote" },
        { 
            view: "button", value: "Save", click: function(){
                $$("form1").save();
                webix.message({ type: "debug", text: "Saved", expired: -1 });
            } 
        },
    ]
};

webix.ready(function(){
    webix.ui({
        rows:[
            { cols:[datatable, form] },
            {}
        ]
    });
    $$("form1").bind("datatable1");
})