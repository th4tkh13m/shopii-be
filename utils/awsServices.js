const { S3Client, ListObjectsV2Command, PutObjectCommand } = require('@aws-sdk/client-s3')
require('dotenv').config()

const client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
})

const commandParams = {
    Bucket: process.env.BUCKET,
}

const getImageUrl = (bucket, region, key) => {
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
}

const getImages = async (type, typeId) => {
    const path = `${type}/${typeId}`

    const listCommandParams = {
        ...commandParams,
        Prefix: path,
    }

    const listCommand = new ListObjectsV2Command(listCommandParams)
    const result = await client.send(listCommand)

    const images = result.Contents.filter(item =>
        item.Key.endsWith('.png'),
    ).map(img => getImageUrl(process.env.BUCKET, process.env.REGION, img.Key))
    console.log(images)
    return images
}

const putImages = async (type, typeId, images) => {
    const path = `${type}/${typeId}`

    for (let index = 0; index < images.length; index++) {
        const element = images[index];

        var imagePath = `${path}/${element.name}`

        var putCommandParams = {
            ...commandParams,
            Key: imagePath,
            Body: element.stream()
        }

        await client.send(new PutObjectCommand(putCommandParams))
    }

    const imageUrls = images.forEach(element => {
        return `${path}/${element.name}`
    });

    return imageUrls
}

getImages('products', 1)

module.exports = {
    getImages,
    putImages
}
