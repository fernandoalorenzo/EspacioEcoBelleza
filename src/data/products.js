const fetchProducts = async () => {
	try {
		setLoading(true);
		setError(null);

		const res = await fetch(
			"https://docs.google.com/spreadsheets/d/ID/export?format=csv"
		);
		const text = await res.text();
		const rows = text.split("\n").map((r) => r.split(","));

		// Asumimos primera fila como cabecera
		const headers = rows[0];
		const data = rows.slice(1).map((row) => {
			const obj = {};
			headers.forEach((h, i) => {
				obj[h.trim()] = row[i]?.trim();
			});
			return obj;
		});

		setProducts(data);
	} catch (err) {
		console.error(err);
		setError("Error al cargar productos");
	} finally {
		setLoading(false);
	}
};
