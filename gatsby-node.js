const slash = require("slash")
const path = require("path")
const { paginate } = require("gatsby-awesome-pagination")

function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;"
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------"
  const p = new RegExp(a.split("").join("|"), "g")

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const songTemplate = path.join(__dirname, "./src/templates/song.js")
  const playlistTemplate = path.join(__dirname, "./src/templates/playlist.js")
  const result = await graphql(`
    {
      songs: allContentfulSong(sort: { fields: title, order: ASC }) {
        nodes {
          contentful_id
          title
          createdAt
        }
      }
      playlists: allContentfulPlaylist {
        edges {
          node {
            contentful_id
            title
            updatedAt
          }
        }
      }
    }
  `)

  paginate({
    createPage,
    items: result.data.songs.nodes,
    itemsPerPage: 5,
    pathPrefix: "/music",
    component: path.resolve("./src/templates/music.js"),
  })

  result.data.songs.nodes.map(node => {
    const { title, contentful_id } = node
    createPage({
      path: `/music/${slugify(title)}`,
      component: slash(songTemplate),
      context: {
        title,
        contentful_id,
      },
    })
  })
  result.data.playlists.edges.map(edge => {
    const { title, contentful_id } = edge.node
    createPage({
      path: `/playlists/${slugify(title)}`,
      component: slash(playlistTemplate),
      context: {
        title,
        contentful_id,
      },
    })
  })
}

// exports.onPostBuild = () => {
//   ChildProcess.execSync(
//     "ps aux | grep jest | grep -v grep | awk '{print $2}' | xargs kill"
//   )
// }

// here we're defining whatever items we're pulling from Contentful which might be
// totally empty.

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//         type allContentfulSong implements Node {
//           tempo: [String]
//           composer: [String]
//         }
//         type ContentfulSong implements Node {
//           tempo: [String]
//           composer: [String]
//         }
//       `
//   createTypes(typeDefs)
// }
