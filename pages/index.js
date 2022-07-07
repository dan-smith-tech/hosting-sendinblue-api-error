export default function Home() {
	function handleSubmit(e) {
		e.preventDefault();

		const email = e.target.email.value;

		fetch("/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<input name="email" placeholder="Enter email..." />
			<button>Sign Up</button>
		</form>
	);
}
