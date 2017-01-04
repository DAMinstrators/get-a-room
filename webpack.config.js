var config = {
   entry: './src/components/app.jsx',
	
   output: {
      path:'./public',
      filename: 'bundle.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;