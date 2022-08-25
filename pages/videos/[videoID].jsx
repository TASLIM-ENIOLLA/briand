import {useRouter} from 'next/router'

export default () => {
    const {query: {videoID}} = useRouter()

    return (
        <h1>{videoID}</h1>
    )
}