const client = require('../config/redis')

const hitCacheProduct = async (req, res, next) => {
  const product = await client.get('wallets')
  if (product !== null) {
    res.json({
      status: 'Success',
      code: 200,
      data: JSON.parse(product),
      message: 'data is taken from redis'
    })
  } else {
    next()
  }
}

module.exports = {
  hitCacheProduct
}
