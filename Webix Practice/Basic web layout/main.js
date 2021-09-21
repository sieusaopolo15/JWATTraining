var header = {
    type: "header", template: "Simple App", css: "webix-header app-header"
};

var footer = {
    type: "header", template: "Footer", css: "webix-header app-header"
};

var datatable = {
    view: "datatable", id: "datatable1",
    columns: [
        { id: "id", header: "#", width: 40 },
        { id: "title", header: "Film Title", fillspace: true },
        { id: "year", header: "Released", width: 80 },
    ],
    select: true, autoheight: true, scrollX: true,
    data: filmset
}

var userDatatable = {
    view: "datatable", id: "datatable1",
    columns: [
        { id: "id", header: "#", width: 40 },
        { id: "username", header: "Username", fillspace: true },
        { id: "role", header: "Role", width: 100 },
    ],
    select: true, autoheight: true,
    data: users
}

//DATATABLE FORM
var datatableForm = {
    view: "form", id: "form1", scroll: false,
    elements: [
        { view: "text", name: "id", label: "ID", disabled: true },
        { view: "text", name: "title", label: "Film Title" },
        { view: "text", name: "year", label: "Released" },
        { view: "text", name: "rating", label: "Rank" },
        { view: "text", name: "vote", label: "Vote" },
        { 
            margin: 5, cols: [
                {
                    view: "button", value: "Save", click: function(){
                        $$("form1").save();
                        webix.message({ text: "Saved", expired: -1 });
                    } 
                },
                {
                    view: "button", value: "Clear", click: function(){
                        $$("form1").clear();
                        webix.message({ text: "Form is cleared", expired: -1 });
                    }
                }
            ]
            
        },
    ]
}
//

var loginForm = {
    view: "form", id: "form2",
    width: 750, 
    elements: [
        { view: "text", required: true, name: "username",  label: "Username", attributes: { maxLength: 25 } },
        { view: "text", required: true, name: "password", type: "password", label: "Password", attributes: { maxLength: 30 } },
        {
            margin: 5, cols: [
                {
                    view: "button", value: "Login", click: function(){
                        if($$("form2").validate()){
                            const value = $$("form2").getValues();
                            const data = users.find(function(user){
                                return value.username == user.username;
                            });
                            if(data.role == "admin"){
                                $$("side_menu").showItem("usermnt");
                            }
                            $$("side_menu").showItem("logout");
                            $$("side_menu").hideItem("login");
                            $$("content").removeView("login");
                            $$("content").addView(grid);
                            $$("form1").bind("datatable1");
                        }
                    }
                },
                {
                    view: "button", value: "Sign up", click: function(){
                        $$("signUpForm").addView(signUpForm, 3);
                    }
                }
            ]
        }
    ],
    rules: {
        $obj: function(data){
            const result = users.find(element => {
                return (element.username == data.username && element.password == data.password);
            });
            if(!result){
                webix.message("Account does not exist !");
                return false;
            }
            else{
                webix.message("Login successful !");
                return true;
            }
                
        }
    },
    elementsConfig: {
        labelPosition: "top"
    }
}

var signUpForm = {
    view: "form", id: "form3",
    elements: [
        { view: "text", required: true, name: "username", label: "Username", attributes: { maxLength: 25 } },
        { view: "text", required: true, name: "password", type: "password", label: "Password", attributes: { maxLength: 30 } },
        { view: "text", required: true, name: "repassword", type: "password", label: "Password", attributes: { maxLength: 30 } },
        {
            margin: 5, cols:[
                {
                    view: "button", value: "Sign Up", click: function(){
                        if($$("form3").validate()){
                            const value = $$("form3").getValues();
                            const data = {
                                id: users.length - 1,
                                username: value.username,
                                password: value.password,
                                role: "employee"
                            };
                            users.push(data);
                            console.log(users);
                            webix.message("User created !");
                        }
                        else {
                            webix.message("Sign up form is not valid !");
                        }
                    }
                },
                {
                    view: "button", value: "Close", click: function(){
                        $$("signUpForm").removeView("form3");
                    }   
                }
            ]
        }
    ],
    rules: {
        $obj: function(data){
            const flag = users.find(element => {
                return element.username == data.username;
            })
            if(data.password != data.repassword){
                webix.message("Passwords are not the same !")
                return false;
            }
            else if(flag){
                webix.message("Username exist ! Please choose different name");
                return false;
            }
            else{
                return true;
            }
        }
    },
    elementsConfig:{
        labelPosition: "top"
    }
}

//DATATABLE AND USER MANAGEMENT
var grid = {
    id: "grid",
    rows: [
        datatable, datatableForm
    ]
}
var grid2 = {
    id: "grid2",
    rows: [
        userDatatable
    ]
}
//



var login = {
    id: "login",
    rows: [
        loginForm,
        {
            id: "signUpForm",
            rows: [
                
            ]
        }
    ]
}

var menu = {
    view: "menu", id: "side_menu", css: "side_menu", width: 180, layout: "y", select: true,
    template: "<span class='webix_icon #icon#'></span> #value#",
    data: [
        { value: "Datatable", id: "datatable", icon: "wxi-columns" },
        { value: "Login", id: "login", icon: "wxi-user" },
        { value: "User Management", id: "usermnt", icon: "wxi-user" },
        { value: "Logout", id: "logout", icon: "wxi-door" },
    ],
    on: {
        onMenuItemClick: function(id){
            if(id == 'login'){
                $$("content").removeView("grid");
                $$("content").removeView("usermnt");
                $$("content").addView(login);
            }
            else if(id == "datatable"){
                $$("content").removeView("login");
                $$("content").removeView("usermnt");
                $$("content").addView(grid);
                $$("form1").bind("datatable1");
            }
            else if(id == "usermnt"){
                $$("content").removeView("login");
                $$("content").removeView("grid");
                $$("content").addView(grid2);
            }
            else if(id == "logout"){
                $$("content").removeView("usermnt");
                $$("content").removeView("grid");
                $$("content").addView(login);

                $$("side_menu").showItem("login");
                $$("side_menu").hideItem("logout");
                $$("side_menu").hideItem("usermnt");
            }
            
        }
    }
}

webix.ready(function() {
    webix.ui({
        container: "layout_div",
        width: 950,
        type: "space",
        rows: [
            header,
            {
                cols: [
                    menu,
                    {
                        id: "content",
                        rows: [
                            
                        ]
                    }
                ],
                autowidth: true,
                height: 600,
                scrollX: false
            },
            footer
        ]
    });
    $$("side_menu").hideItem("usermnt");
    $$("side_menu").hideItem("logout");
    $$("side_menu").select("datatable");
});