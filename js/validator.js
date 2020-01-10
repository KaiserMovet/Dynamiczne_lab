var alfa = 123;
var bool_dict = {};


function check_validation() {
    var submit_but = document.getElementById("submitBut");

    if (Object.keys(bool_dict).length != 8) {
        submit_but.setAttribute("disabled",'');


        return


    }
    for (var key in bool_dict) {
        // check if the property/key is defined in the object itself, not in parent
        if (!bool_dict[key]) {
            submit_but.setAttribute("disabled",'');

            return
        }

    }

    submit_but.removeAttribute("disabled",'');

}

function update_error(pole, poleError, is_valid, text, log = true) {
    bool_dict[pole.id] = is_valid;
    check_validation();
    if (is_valid) {
        poleError.innerHTML = text;
        if (log) {
            pole.classList.remove("is-invalid");
            pole.classList.add("is-valid");
            poleError.classList.remove("invalid-feedback");
            poleError.classList.add("valid-feedback");
        }
    } else {
        poleError.innerHTML = text;
        if (log) {
            pole.classList.remove("is-valid");
            pole.classList.add("is-invalid");
            poleError.classList.remove("valid-feedback");
            poleError.classList.add("invalid-feedback");
        }
    }
}

function check_len(pole, poleError, min = 0, max = Number.POSITIVE_INFINITY) {
    if (pole.value.length < min) {
        update_error(pole, poleError, false, 'Za krotkie');
        return false;
    }
    if (pole.value.length > max) {
        update_error(pole, poleError, false, 'Za dlugie');
        return false;
    }
    update_error(pole, poleError, true, 'ok');
    return true;
}

function check_regexp(pole, poleError, regexp, false_text, true_text = 'ok') {
    if (regexp.test(pole.value)) {
        update_error(pole, poleError, true, true_text);
        return true;
    } else {
        update_error(pole, poleError,
            false, false_text);
        return false;
    }
}

function nameValidator(pole_id, poleError_id) {
    var pole = document.getElementById(pole_id);
    var poleError = document.getElementById(poleError_id);
    if (!check_len(pole, poleError)) {
        return;
    }
    regexp = /^[A-Za-z]+$/;
    check_regexp(pole, poleError, regexp, 'Name should have letters only');
}


function codeValidator(pole_id, poleError_id) {
    var pole = document.getElementById(pole_id);
    var poleError = document.getElementById(poleError_id);
    if (!check_len(pole, poleError, 6, 6)) {
        return;
    }
    regexp = /^[A-Za-z0-9]{2}-[A-Za-z0-9]{3}/;
    check_regexp(pole, poleError, regexp, 'Invalid pattern (should be XX-XXX)');
}

function priceValidator(pole_id, poleError_id) {
    var pole = document.getElementById(pole_id);
    var poleError = document.getElementById(poleError_id);
    if (!check_len(pole, poleError)) {
        return;
    }
    regexp = /^[-+]?[0-9]*\.?[0-9]{1,2}$/;
    check_regexp(pole, poleError, regexp,
        'Price should be number, and have max 2 numbers on decimal places');
}

function updatePrice(pole_id) {
    var price = document.getElementById(pole_id);
    if (price.classList.contains("is-valid")) {
        price.value = parseFloat(price.value).toFixed(2)
    }
}


function vatValidator(pole_id, poleError_id) {
    var pole = document.getElementById(pole_id);
    var poleError = document.getElementById(poleError_id);
    if (!check_len(pole, poleError)) {
        return;
    }
    regexp = /^[-+]?[0-9]*\.?[0-9]{1,2}$/;
    check_regexp(pole, poleError, regexp,
        'Vat should be number, and have max 2 numbers on decimal places');
}

function UpdateBrutto(brutto_id, inputPrice_id, inputVat_id) {
    var price = document.getElementById(inputPrice_id);
    var vat = document.getElementById(inputVat_id);
    var brutto = document.getElementById(brutto_id);
    if (price.classList.contains("is-valid")
        && vat.classList.contains("is-valid")) {
        brutto.value = (parseFloat(price.value) *
            (100 + parseFloat(vat.value)) / 100).toFixed(2);
    }
}

function categoriesValidator(pole_id, poleError_id, def_value) {
    var pole = document.getElementById(pole_id);
    var poleError = document.getElementById(poleError_id);
    if (pole.value != def_value) {
        update_error(pole, poleError, true, 'ok');
    } else {
        update_error(pole, poleError, false, 'Please select category');
    }
}

function optionValidator(pole_id, poleError_id) {
    var pole = document.getElementById(pole_id);
    var poleError = document.getElementById(poleError_id);
    counter = 0
    for (i = 0; i < pole.children.length; i++) {
        counter += pole.children[i].children[0].checked;
    }

    if (counter >= 2) {


        update_error(pole, poleError, true, 'ok', false);
    } else {


        update_error(pole, poleError, false,
            'Please check minimum two options', false);
    }
}

function rateValidator(pole_id, poleError_id) {
    var pole = document.getElementById(pole_id);
    var poleError = document.getElementById(poleError_id);

    counter = 0
    for (i = 0; i < pole.children.length; i++) {
        counter += pole.children[i].children[0].checked;
    }

    if (counter > 0) {


        update_error(pole, poleError, true, 'ok');
    } else {

        update_error(pole, poleError, false,
            'Please check minimum one options');
    }
}

function fileValidator(pole_id, poleError_id) {
    var pole = document.getElementById(pole_id);
    var poleError = document.getElementById(poleError_id);
    if (!check_len(pole, poleError)) {
        return;
    }
}

function makeRow(all_data) {
    row = "<tr>";
    row += "<td>" + all_data["name"] + "</td>";
    row += "<td>" + all_data["code"] + "</td>";
    row += "<td>" + all_data["netto"] + "</td>";
    row += "<td>" + all_data["vat"] + "</td>";
    row += "<td>" + all_data["brutto"] + "</td>";
    row += "<td>" + all_data["category"] + "</td>";
    row += "<td>" + all_data["options"] + "</td>";
    row += "<td>" + all_data["rate"] + "</td>";
    row += "<td>" + all_data["photo"] + "</td>";
    row += "</tr>";
    return row;
}

function prepareData() {
    all_data = {};
    all_data["name"] = document.getElementById("inputName").value;
    all_data["code"] = document.getElementById("inputCode").value;
    all_data["netto"] = document.getElementById("inputPrice").value;
    all_data["vat"] = document.getElementById("inputVat").value;
    all_data["brutto"] = document.getElementById("inputPrice2").value;
    all_data["category"] = document.getElementById("inputCategories").value;

    options = "";
    var option_var = document.getElementById("inputOption");
    for (i = 0; i < option_var.children.length; i++) {
        if (option_var.children[i].children[0].checked) {
            options += (i + 1);
        }
    }

    all_data["options"] = options;


    var rate_var = document.getElementById("inputRate");
    rate = "";
    for (i = 0; i < rate_var.children.length; i++) {

        if (rate_var.children[i].children[0].checked) {
            rate = (i + 1)
            break;
        }
    }
  
    all_data["rate"] = rate;
    all_data["photo"] = document.getElementById("inputFile").value;

    return all_data;


}

function addData() {
    var t = $('#myTable');


    row = makeRow(prepareData())
    console.log(row)
    resort = true;
    t.find('tbody')
        .trigger('addRows', [row, resort]);
    return false;

}


function sortTable(row_number) {
    $("#myTable").trigger("sorton", [[[row_number, 0]]]);


}
