'use strict';
{
	async function fetchJSON(url) {
		try {
			const res = await axios.get(url);
			const data = await res.data;
			return data;
		} catch (err) {
			console.log(`There is an error ${err}`);
		}
	}
	function createAndAppend(name, parent, options = {}) {
		const elem = document.createElement(name);
		parent.appendChild(elem);
		Object.entries(options).forEach(([ key, value ]) => {
			if (key === 'text') {
				elem.textContent = value;
			} else {
				elem.setAttribute(key, value);
			}
		});
		return elem;
	}

	function renderRepoDetails(repo, ul) {
		const li = createAndAppend('li', ul);
		const table = createAndAppend('table', li);

		let tr = createAndAppend('tr', table);
		//Repository
		createAndAppend('th', tr, { text: 'Repository:' });
		let td = createAndAppend('td', tr);
		createAndAppend('a', td, {
			href: repo.html_url,
			text: repo.name,
			target: '_blank'
		});
		//Description
		tr = createAndAppend('tr', table);
		createAndAppend('th', tr, { text: 'Description:' });
		td = createAndAppend('td', tr, { text: repo.description });
		//Forks
		tr = createAndAppend('tr', table);
		createAndAppend('th', tr, { text: 'Forks:' });
		td = createAndAppend('td', tr, { text: repo.forks });
		//Updated
		tr = createAndAppend('tr', table);
		createAndAppend('th', tr, { text: 'Updated:' });
		td = createAndAppend('td', tr, { text: repo.updated_at });
	}

	async function contributorDetail(url) {
		let select = document.createElement('select');
		const fetchData = await axios.get(url);
		const data = await fetchData.data;
		console.log(data);
		let byData = data;
		byData.sort((a, b) => a.name.localeCompare(b.name));
		byData.forEach((repo, index) => {
			let option = document.createElement('option');
			option.value = index;
			option.innerText = repo.name;
			select.appendChild(option);
		});
		select.addEventListener('click', () => {
			let repo = document.getElementById('repository');
			let sectionContributor = document.getElementById('contributor');
			if (repo.hasChildNodes()) {
				repo.removeChild(repo.lastChild);
			}
			while (sectionContributor.hasChildNodes()) {
				sectionContributor.removeChild(sectionContributor.lastChild);
			}
			async function getData() {
				const res = await axios.get(`https://api.github.com/repos/HackYourFuture/
				${byData[select.value].name}/contributors`);
				const data = await res.data;
				data.forEach((ele) => {
					let contributorDiv = document.createElement('div');
					contributorDiv.id = 'contributorDiv';
					let h4 = createAndAppend('h4', contributorDiv);
					let h5 = createAndAppend('h5', contributorDiv);
					let img = createAndAppend('img', contributorDiv);
					h4.innerText = ele.login;
					h5.innerText = ele.contributions;
					img.src = ele.avatar_url;
					sectionContributor.appendChild(contributorDiv);
				});
			}
			getData();

			let ul = createAndAppend('ul', repo);
			renderRepoDetails(byData[select.value], ul);
		});

		let header = document.getElementById('header');
		header.appendChild(select);
		let contributor = document.getElementById('contributor');
		while (contributor.hasChildNodes()) {
			contributor.removeChild(contributor.lastChild);
		}
	}

	async function main(url) {
		try {
			const res = await axios.get(url);
			const data = await res;
			console.log(data);
		} catch (err) {
			createAndAppend('div', root, {
				text: err.message,
				class: 'alert-error'
			});
		}
		contributorDetail(url);
	}

	const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
	window.onload = () => main(HYF_REPOS_URL);
}
