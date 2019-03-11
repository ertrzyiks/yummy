const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

function getContent(params) {
  const recipe = {
    title: '',
    date: '2019-01-01T00:00:00Z',
    required_time: '60min',
    category: 'obiady',
    tags: ['kurczak'],
    featuredImage: '../../cover.jpg',
    headline: 'Nagłówek',
    ingredients: '## Lista zakupów',
    directions: '## Przygotowanie',
    ...params
  }

  return `---
title: ${recipe.title}
date: ${recipe.date}
required_time: ${recipe.required_time}
category:
 - ${recipe.category}
tags:
 - ${recipe.category}
featured_image: ${recipe.featuredImage}
---
    
${recipe.headline}  
<!---- splitter ---->
${recipe.ingredients}  

<!---- splitter ---->
${recipe.directions}  
`
}

function createRecipe({content, relativePath}) {
  const finalPath = path.join(path.resolve('cypress/fixtures/'), relativePath)
  mkdirp.sync(path.dirname(finalPath))
  fs.writeFileSync(finalPath, content)
}

exports.sourceNodes = () => {
  createRecipe({
    relativePath: 'obiady/obiad-a/index.md',
    content: getContent({
      title: 'Obiad A',
      date: '2019-01-01T00:00:00Z',
      category: 'obiady',
      tags: ['kurczak']
    })
  })

  createRecipe({
    relativePath: 'zupy/zupa-a/index.md',
    content: getContent({
      title: 'Zupa A',
      date: '2019-01-01T00:00:00Z',
      category: 'zupy',
      tags: ['woda']
    })
  })

  createRecipe({
    relativePath: 'koktajle/zupa-a/index.md',
    content: getContent({
      title: 'Koktajl A',
      date: '2019-01-01T00:00:00Z',
      category: 'koktajle',
      tags: ['woda']
    })
  })

  createRecipe({
    relativePath: 'sniadaniowe/sniadaniowe-a/index.md',
    content: getContent({
      title: 'Sniadaniowe A',
      date: '2019-01-01T00:00:00Z',
      category: 'sniadaniowe',
      tags: ['woda']
    })
  })

  createRecipe({
    relativePath: 'ciasta/ciasto-a/index.md',
    content: getContent({
      title: 'Ciasta A',
      date: '2019-01-01T00:00:00Z',
      category: 'ciasta',
      tags: ['woda']
    })
  })
}