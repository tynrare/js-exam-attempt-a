module.exports = [
		{
			enforce: 'pre',
			test: /\.js$/,
			exclude: /node_modules|lib/,
			loader: 'eslint-loader',
			options: {
				fix: false
			}
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		},
		{ test: /\.(html|frag|vert|glsl)$/, use: 'raw-loader' }
	]
