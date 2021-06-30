const CracoEsbuildPlugin = require("craco-esbuild");

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        esbuildLoaderOptions: {
          loader: "jsx",
        //   target: "es2015",
        },
      },
    },
  ],
};

// const CracoSwcPlugin = require("craco-swc");

// module.exports = {
//   plugins: [
//     {
//       plugin: CracoSwcPlugin,
//       options: {
//         swcLoaderOptions: {
//           jsc: {
//             externalHelpers: true,
//             target: "es2015",
//             parser: {
//               syntax: "ecmascript",
//               jsx: true,
//               dynamicImport: true,
//               exportDefaultFrom: true,
//             },
//           },
//         },
//       },
//     },
//   ],
// };