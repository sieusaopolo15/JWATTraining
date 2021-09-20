var datatable = {
    view: "datatable", id: "datatable1",
    select: true, autoheight: true,
    columns: [
        { id: "title", header: "Film Title", fillspace: true },
        { id: "year", header: "Released", width: 80 },
        { id: "vote", header: "Vote", width: 60 },
        { id: "rating", header: "Rating", width: 75 },
        { id: "id", header: "Rank", width: 60 },
    ],
    data: filmset
};

var form1 = {
    view: "form", id: "form1",
    elements: [
        { view: "text", name: "id", label: "ID", disabled: true },
        { view: "text", name: "title", label: "Film Title" },
        { view: "text", name: "year", label: "Year" },
        {
            view: "button", value: "Save", click: function(){
                $$("form1").save();
                webix.message({ type: "debug", text: "Form 1 Saved", expired: -1 });
            }
        }
    ]
};
var form2 = {
    view: "form", id: "form2",
    elements: [
        { view: "text", name: "rating", label: "Rating" },
        { view: "text", name: "vote", label: "Vote" },
        {},
        {
            view: "button", value: "Save", click: function(){
                $$("form2").save();
                webix.message({ type: "debug", text: "Form 2 Saved", expired: -1 });
            }
        }
    ]
};

webix.ready(function () {
    webix.ui({
        rows: [
            datatable,
            {
                cols:[form1, form2]
            }
        ]
    });
    $$("form1").bind("datatable1");
    $$("form2").bind("datatable1");
});