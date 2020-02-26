'use strict';

{
	const { createAndAppend } = window.Util;

	class RepoView {
		constructor(container) {
			this.container = container;
		}

		update(state) {
			if (!state.error) {
				this.render(state.selectedRepo);
			}
		}

		/**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
		render(repo) {
			// TODO: replace this comment and the console.log with your own code
			this.container.innerHTML = '';
			const repoContainer = document.querySelector('.repo-container');
			const table = createAndAppend('table', repoContainer);
			table.className = 'repo-table';
			const repoData = [
				{ key: 'Repository:', value: repo.name },
				{ key: 'Description:', value: repo.description },
				{ key: 'Forks:', value: repo.fork },
				{ key: 'Updated:', value: repo.updated_at }
			];

			for (let i = 0; i < repoData.length; i++) {
				let tr = createAndAppend('tr', table);
				createAndAppend('th', tr, { text: repoData[i].key });

				if (i === 0) {
					createAndAppend('a', tr, {
						text: repo.name,
						href: repo.html_url,
						target: '_blank'
					});
				} else {
					createAndAppend('td', tr, { text: repoData[i].value });
				}
			}

			console.log('RepoView', repo);
		}
	}

	window.RepoView = RepoView;
}
