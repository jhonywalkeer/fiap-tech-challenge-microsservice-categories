export const QueueAttributeName = 'All'

export const Queue = {
  MaxNumberOfMessages: 5,
  WaitTimeSeconds: 10,
  Category: {
    Name: process.env.CATEGORY_QUEUE_URL as string
  },
  Product: {
    Name: process.env.PRODUCT_QUEUE_URL as string
  }
}
