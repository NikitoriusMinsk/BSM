const ArrayToChunks = <T>(arr: Array<T>, size: number) => {
	return Array.from(new Array(Math.ceil(arr.length / size)), (_, i) =>
		arr.slice(i * size, i * size + size)
	);
};

export default ArrayToChunks;
