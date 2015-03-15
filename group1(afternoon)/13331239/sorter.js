window.onload = function()
{
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables()
{
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables)
{
	for (var i = 0; i < tables.length; ++i) {
        makeTableSortable(tables[i]);
    }
}
function makeTableSortable(table)
{
	//var name = table.className;
	//table.setAttribute("id", name);
	var name = table.id;
	//var ths = table.getElementsByTagName("th");
	var ts = table.rows;
	var ths = ts[0].cells;
	for (var i = 0; i < ths.length; i++) {
		(function(i)
		{
			ths[i].onmouseout = function()
			{
				this.style.backgroundImage = "none";
			};
			ths[i].onclick = function()
			{
				sortTable(name, i);
			};
		})(i);
	};
}

function sortTable(sTableid,iCol)
{
	var oTable = document.getElementById(sTableid);
	var oTbody = oTable.tBodies[0];
	var colDataRows = oTbody.rows;
	colDataRows[1].style.backgroundColor = "white";

	var tr = new Array();
	for (var i = 0; i < colDataRows.length; i++) {
		tr.push(colDataRows[i]);
	};


	if (oTable.sortCol == iCol)
	{
		tr.reverse();
		
		if (oTable.rows[0].cells[iCol].style.backgroundImage.match(/ascend.png/)) {
			oTable.rows[0].cells[iCol].style.backgroundImage = "url('descend.png')";
		} else {
			oTable.rows[0].cells[iCol].style.backgroundImage = "url('ascend.png')";
		}

	}
	else
	{
		tr.sort(Compare(iCol));
		oTable.rows[0].cells[iCol].style.backgroundImage = "url('ascend.png')";
	}
	var oFragment = document.createDocumentFragment();
	for (var i = 0; i < tr.length; i++) {
		oFragment.appendChild(tr[i]);
	};

	oTbody.appendChild(oFragment);
	oTable.sortCol = iCol;
	colDataRows[1].style.backgroundColor = "#d9d6c3";
}

function Compare(iCol)
{
	return function compare(oTR1, oTR2)
	{
		var value1 = oTR1.cells[iCol].firstChild.nodeValue;
		var value2 = oTR2.cells[iCol].firstChild.nodeValue;
		if (value1 > value2) {
			return 1;
		} else if (value1 < value2)
		{
			return -1;
		} else {
			return 0;
		}
	}
}