var header = {

};

webix.ready(function() {
    webix.ui({
        container: "layout_div",
        width: 950,
        type: "space",
        rows: [
            header,
            {
                cols: [
                    {},
                    {
                        rows: [
                            {},
                        ]
                    }
                ],
                autowidth: true,
                height: 600,
                scrollX: false
            }
        ]
    });

});