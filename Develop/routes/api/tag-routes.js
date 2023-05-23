const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
await Tag.findAll({
  attributes: ['id', 'tag_name'],
  include: [
    {model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      through: ProductTag,
    },],
}).then((parsedTagData)=> {
  res.json(parsedTagData);
})
.catch((err) => {
  res.json(err);
});
});
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

await  Tag.findByPk(req.params.id, {
  include: [
    {model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      through: ProductTag,
    },],
})
.then((retrievedTag) => {
  res.json(retrievedTag);
  })
  .catch((err) => { 
    res.json(err);
  });
});

router.post('/', async (req, res) => {
  // create a new tag
 await  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((tag) => {
    res.json(tag);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
 await Tag.update({
    tag_name: req.body.tag_name,
  },{
    where: {
      id: req.params.id,
  },})
  .then((tag) => {
    
    res.json(`tag was updated in the database`);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
 await Tag.destroy({
    where: {
      id: req.params.id,
  },})
  .then((tag) => {
    res.json(`tag was removed from the database`);})
  .catch((err) => {
    res.json(err);
  })
});

module.exports = router;
