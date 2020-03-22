import typescript from 'rollup-plugin-typescript2'

export default [
    {
        input: 'src/rest-io-client.ts',
        output: [
            {
                file: 'build/rest-io-client.js',
                format: 'esm'
            },
            {
                file: 'build/rest-io-client.umd.js',
                format: 'umd',
                name: 'RestSocket'
            }
        ],
        external: ['socket.io-client'],
        plugins: [typescript()]
    }
]