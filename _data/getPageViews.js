const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async () => {
    try {
      let endpoint = 'https://anthony-scardapane.deno.dev/blog/'

      const response =  await Cache(endpoint, {
        duration: "4h",
        type: "json"
      });

      return response.blogList
    } catch (error) {
      return []
    }
};

