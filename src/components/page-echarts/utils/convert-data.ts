import coordinateData from './coordinate'

export const convertData: any = function (data: any) {
    const res = []
    for (let i = 0; i < data.length; i++) {
        const geoCoord = coordinateData[data[i].name]
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            })
        }
    }
    return res
}
