const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contact: []
		},
		actions: {
			setUser: user => {
				setStore({ user: user });
			},
			addContact: async data => {
				let response = await fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					mode: "cors",
					redirect: "follow",
					headers: new Headers({
						"Content-Type": "application/json"
					}),
					body: JSON.stringify({
						full_name: data.name,
						email: data.email,
						agenda_slug: "Richard_Contacts",
						address: data.address,
						phone: data.phone
					})
				});
				response = await response.json();
				getActions().getAllContact();
			},
			getContact: async id => {
				let response = await fetch(`https://assets.breatheco.de/apis/fake/contact/` + id, {
					method: "GET",
					mode: "cors",
					redirect: "follow",
					headers: new Headers({
						"Content-Type": "application/json"
					})
				});
				response = await response.json();
				getActions().setUser(response);
			},
			getAllContact: async () => {
				let response = await fetch(`https://assets.breatheco.de/apis/fake/contact/agenda/Richard_Contacts`, {
					method: "GET",
					mode: "cors",
					redirect: "follow",
					headers: new Headers({
						"Content-Type": "application/json"
					})
				});
				response = await response.json();
				setStore({ contact: response });
			},
			editContact: async (id, data) => {
				let response = await fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "PUT",
					mode: "cors",
					redirect: "follow",
					headers: new Headers({
						"Content-Type": "application/json"
					}),
					body: JSON.stringify({
						full_name: data.name,
						email: data.email,
						agenda_slug: "Richard_Contacts",
						address: data.address,
						phone: data.phone
					})
				});
				response = await response.json();
				getActions().getAllContact();
				getActions().setUser("");
			},

			deleteContact: async id => {
				let response = await fetch(`https://assets.breatheco.de/apis/fake/contact/` + id, {
					method: "DELETE",
					mode: "cors",
					redirect: "follow",
					headers: new Headers({
						"Content-Type": "application/json"
					})
				});
				response = await response.json();
				getActions().getAllContact();
			}
		}
	};
};

export default getState;
