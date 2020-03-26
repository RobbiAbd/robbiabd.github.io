const menu = document.querySelector('.menu-data');
const table = document.querySelector('.table-data-provinsi');

menu.classList.toggle('loader');


getDataIndonesia()
.then(data => updateUiMenu(data));


getDataProvinsi()
.then(data => updateUiTableProvinsi(data));


async function getDataIndonesia() {
	return await fetch('https://api.kawalcorona.com/indonesia/')
	.finally(() => menu.classList.toggle('loader'))
	.then(resp => {
		if (!resp.ok) {
			throw new Error(resp);
		}
		return resp.json();
	})
	.then(resp => resp)
	.catch(err => console.log(err));
}

async function getDataProvinsi() {
	return await fetch('https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/indonesia/provinsi')
	.finally(() => {
		const loaderTable = document.querySelector('.loader-table');
		loaderTable.classList.remove('loader');
	})
	.then(resp => {
		if (!resp.ok) {
			throw new Error(resp);
		}
		return resp.json();
	})
	.then(resp => resp)
	.catch(err => console.log(err));
}


function updateUiMenu(data) {
	let html = '';
	data.forEach(dt => {
		html = `<div class="col-md-4 mt-3">
		<div class="card bg-danger">
		<div class="card-body">
		<div class="d-flex">
		<div class="text-white">
		<p class="text-white mb-0">TOTAL POSITIF</p>
		<h2 class="mb-0 number-font">${dt.positif}</h2>
		<p class="text-white mb-0">ORANG</p>
		</div>
		<div class="ml-auto"> <i class="far fa-frown fa-5x"></i> </div>
		</div>
		</div>
		</div>
		</div>

		<div class="col-md-4 mt-3">
		<div class="card bg-success">
		<div class="card-body">
		<div class="d-flex">
		<div class="text-white">
		<p class="text-white mb-0">TOTAL SEMBUH</p>
		<h2 class="mb-0 number-font">${dt.sembuh}</h2>
		<p class="text-white mb-0">ORANG</p>
		</div>
		<div class="ml-auto"> <i class="far fa-smile fa-5x"></i> </div>
		</div>
		</div>
		</div>
		</div>

		<div class="col-md-4 mt-3 mb-5">
		<div class="card bg-warning">
		<div class="card-body">
		<div class="d-flex">
		<div class="text-white">
		<p class="text-white mb-0">TOTAL MENINGGAL</p>
		<h2 class="mb-0 number-font">${dt.meninggal}</h2>
		<p class="text-white mb-0">ORANG</p>
		</div>
		<div class="ml-auto"> <i class="far fa-sad-tear fa-5x"></i> </div>
		</div>
		</div>
		</div>
		</div>`;
	});

	menu.innerHTML = html;
}


function updateUiTableProvinsi(data) {
	let html = '';
	data.forEach((dt,i) => {
		html += `<tr>
		<th scope="row">${i + 1}</th>
		<td>${dt.attributes.Provinsi}</td>
		<td>${dt.attributes.Kasus_Posi}</td>
		<td>${dt.attributes.Kasus_Semb}</td>
		<td>${dt.attributes.Kasus_Meni}</td>
		</tr>`;
	});
	
	table.innerHTML = html;
}