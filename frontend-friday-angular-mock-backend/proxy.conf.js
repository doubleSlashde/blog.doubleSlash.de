const PROXY_CONFIG = [
  {
    context: [
      "/movies**",
    ],
    // Has to be set to physical file otherwise it gets an endless loop and we can't read body of request
    "target": "http://localhost:4200/assets/mocks/emptyFile.json",
    "secure": false,
    "onProxyReq": (proxyReq, req, res) => {

      if(req.method === "DELETE") {
        return res.status(204).json({});
      }
      return res.json([{
        title:"Super Awesome Movie",
        releaseDate: "2020-12-12",
        genre: "Action"
      }, {
        title:"Super Awesome Movie 2 - More Awesomeness",
        releaseDate: "2021-03-03",
        genre: "Action, Drama"
      }]);
    }
  }
]

module.exports = PROXY_CONFIG;
