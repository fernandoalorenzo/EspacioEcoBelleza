import { useState, useEffect } from "react";

// https://docs.google.com/spreadsheets/d/1ZcUxcBoUsMEaV4Ti9h6BgguZd_uKrHRR4IvcAFgAUV8/edit?usp=sharing

// 🔹 Configuración de tu hoja de Google Sheets
const SHEET_ID = "1ZcUxcBoUsMEaV4Ti9h6BgguZd_uKrHRR4IvcAFgAUV8"; // ejemplo: 1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
const SHEET_GID = "0"; // 0 si es la primera pestaña, o el GID de la hoja
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;

// 🔹 Convierte links de Google Drive a formato directo (uc?id=...)
const getDirectDriveLink = (url) => {
	if (!url) return url;
	// Si ya está en formato directo, lo dejamos igual
	if (url.includes("uc?id=")) return url;
	// Si es un link de Google Drive con /d/{ID}/view
	const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
	if (match && match[1]) return `https://drive.google.com/uc?id=${match[1]}`;
	return url; // Otros enlaces se dejan igual
};

export const useProducts = (options = {}) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			setError(null);

			const res = await fetch(SHEET_URL);
			const text = await res.text();
			const json = JSON.parse(text.substr(47).slice(0, -2));

			const rows = json.table.rows.map((r) => r.c.map((c) => c?.v ?? ""));
			const headers = json.table.cols.map((c) => c.label);

			const data = rows.map((row) => {
				const obj = {};
				headers.forEach((h, i) => {
					obj[h] = row[i];
				});
				if (obj.image) obj.image = getDirectDriveLink(obj.image);
				return obj;
			});

			// Filtrar por categoría y búsqueda
			let filtered = data;
			if (options.category) {
				filtered = filtered.filter((p) =>
					p.category
						?.toLowerCase()
						.includes(options.category.toLowerCase())
				);
			}
			if (options.search) {
				filtered = filtered.filter(
					(p) =>
						p.name
							?.toLowerCase()
							.includes(options.search.toLowerCase()) ||
						p.description
							?.toLowerCase()
							.includes(options.search.toLowerCase())
				);
			}

			setProducts(filtered);
		} catch (err) {
			console.error("Error al cargar productos:", err);
			setError("Error al cargar productos");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [options.category, options.search]);
	return { products, loading, error, refetch: fetchProducts };
};