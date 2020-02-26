'use strict';

{
	const { createAndAppend } = window.Util;

	class ContributorsView {
		constructor(container) {
			this.container = container;
		}

		update(state) {
			if (!state.error) {
				this.render(state.contributors);
			}
		}

		/**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
		render(contributors) {
			// TODO: replace this comment and the console.log with your own code
			this.container.innerHTML = '';
			contributors.forEach((ele) => {
				const mainDiv = document.querySelector('.contributors-container');
				console.log(mainDiv);

				const contributorsDiv = createAndAppend('div', mainDiv, {
					class: 'contributorsDiv'
				});

				const div = createAndAppend('div', contributorsDiv, {
					class: 'imgDiv'
				});
				const img = createAndAppend('img', div);

				img.src = ele.avatar_url;

				const loginDiv = createAndAppend('div', contributorsDiv, {
					class: 'login'
				});

				createAndAppend('a', loginDiv, {
					text: ele.login,
					href: ele.html_url,
					target: '_blank'
				});

				const buttonDiv = createAndAppend('div', contributorsDiv, {
					class: 'buttonDiv'
				});
				createAndAppend('button', buttonDiv, { text: ele.contributions });
			});

			console.log('ContributorsView', contributors);
		}
	}

	window.ContributorsView = ContributorsView;
}
