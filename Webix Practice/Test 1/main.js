//FUNCTIONS
    var id;
    function saveRow() {
        let value = $$("myform").getValues();
        console.log(filmset.size);
        if (value.id) {
            $$("mylist").updateItem(value.id, value);
        } else {
            $$("mylist").add(value);
        }
    }
    function deleteRow() {
        let id = $$("mylist").getSelectedId(); //returns the ID of selected item
        $$("mylist").remove(id);

        webix.confirm({
            title: "Delete", // the text of the box header
            text: "Are you sure you want to delete the selected item?",
            callback: function (result) {
                if (result) {
                    $$("mylist").remove(id);
                }
            },
        });
    }

//



var buttons = {
    view: "toolbar", elements: [
        { view: "button", width: 100, value: "Save", click: saveRow },
        { view: "button", width: 100, value: "Delete", click: deleteRow },
        { view: "button", width: 100, value: "Clear", click: () => $$("myform").clear() },
    ]
};

var content = {
    type: "line",
    cols: [
        {
            view: "form", id: "myform", width: 400, elements: [
                { view: "text", name: "title", label: "Film Title", width: 280, align: "center" },
                { view: "text", name: "year", label: "Released", width: 280, align: "center" },
            ]
        },
        { view: "resizer" },
        {
            view: "list", id: "mylist", template: "#title# - #year#", select: true, height: 250, data: filmset,
        }
    ], 
};

webix.ready(function () {
    grida = webix.ui({
        rows: [
            buttons,
            content
        ]
    });
    $$("mylist").attachEvent("onAfterSelect", function(id){
        const item = $$("mylist").getItem(id);
        $$("myform").setValues(item);
    });
});