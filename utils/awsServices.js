const {
    S3Client,
    ListObjectsV2Command,
    PutObjectCommand,
    DeleteObjectCommand,
} = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid')

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

const getImageKey = url => {
    const index = url.indexOf('.amazonaws.com/')
    if (index !== -1) {
        return url.substring(index + '.amazonaws.com/'.length)
    } else {
        return null // Return null if ".amazonaws.com/" is not found in the URL
    }
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
    return images
}

const putImages = async (type, typeId, images) => {
    const path = `${type}/${typeId}`

    for (let index = 0; index < images.length; index++) {
        const element = images[index]
        const imageName = `${uuidv4()}.png`

        var imagePath = `${path}/${imageName}`

        var putCommandParams = {
            ...commandParams,
            Key: imagePath,
            Body: element.buffer,
        }

        await client.send(new PutObjectCommand(putCommandParams))
    }
}

const deleteImages = async deleteImages => {
    for (let index = 0; index < deleteImages.length; index++) {
        const key = getImageKey(deleteImages[index])
        var deleteCommandParams = {
            ...commandParams,
            Key: key,
        }

        await client.send(new DeleteObjectCommand(deleteCommandParams))
    }
}

module.exports = {
    getImages,
    putImages,
    deleteImages,
}
