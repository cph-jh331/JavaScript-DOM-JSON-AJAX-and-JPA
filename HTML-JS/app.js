//import dataStore from './data';

let tableData = null;

document.getElementById("body").onload = () => { onLoadHandler() };

onLoadHandler = () => {
    console.log("body loaded");
}

document.getElementById("btnsend").onclick = () => { onSubmitHandler() }
document.getElementById("btnsql").onclick = () => { onGetSqlHandler() }

const onGetSqlHandler = event => {
    const sqlNode = document.getElementById("sql");
    if (tableData) {
        if (tableData.error) {
            sqlNode.value = "error";
        } else {
            sqlNode.value = formatSQL();
        }
    } else {
        sqlNode.value = "";
    }
}

const onSubmitHandler = event => {
    let gender = document.getElementById("gender").value;
    let region = document.getElementById("region").value;
    let amount = document.getElementById("amount").value;
    getData(gender, region, amount, data => {
        if (data.error) {
            document.getElementById("tblbody").innerHTML = "<div class='alert alert-danger'>" + data.error + "</div>";
        } else {
            document.getElementById("tblbody").innerHTML = formatTable(data);
        }
    });
}

const formatTable = (data) => {
    let rows = data.map((person, index) => (
        "<tr id=" + index + " >"
        + "<td>" + person.name + "</td>"
        + "<td>" + person.surname + "</td>"
        + "<td>" + person.gender + "</td>"
        + "</tr>"
    ));
    return rows.join('');
}

const formatSQL = () => {
    let rows;
    if (tableData) {
        rows = tableData.map(person => (
            "INSERT INTO persons (name,surname,gender) VALUES ('" + person.name + "','" + person.surname + "','" + person.gender + "');"
        ));
    }
    return rows.join('\n');
}

const getData = (gender, region, amount, cb) => {
    updateData(gender, region, amount, cb);
}

const updateData = async (gender, region, amount, cb) => {
    //http://uinames.com/api/?amount=25&region=denmark&gender=female"
    let fetchUrl = "http://uinames.com/api/?amount=" + amount;
    if (region !== "All") {
        fetchUrl += "&region=" + region;
    }
    if (gender !== "both") {
        fetchUrl += "&gender=" + gender;
    }
    try {
        let response = await fetch(fetchUrl, { method: "GET" });
        let data = await response.json();
        if (cb) {
            tableData = data;
            cb(tableData);
        }
    }
    catch (e) {
        console.log(e);
    }
}