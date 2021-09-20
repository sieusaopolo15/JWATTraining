webix.ready(function () {
    webix.ui({
        view: "layout",
        rows: [
            {view:"template", template:"Hi there!"},
            {view:"template", template:"You're doing great!"}
        ]
    });
});