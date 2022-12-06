import useSWR from 'swr'
import { Auth } from 'aws-amplify'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

// Retrieve object list of S3 bucket
async function fetchS3Objects(bucket) {
  try {
    const s3 = new S3Client({
      region: 'ap-northeast-1',
      credentials: await Auth.currentCredentials(),
    })
    const output = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        MaxKeys: 10
      })
    )
    if (!output.Contents) return []
    return {
      keys: output.Contents.map((c) => c.Key)
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

function ObjectList() {
  const { data, error } = useSWR(
    'atsupi20221203bucket',
    fetchS3Objects,
  )
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>Loading...</div>
  return (
    <ul>
      {data.keys.map((k) => <li key={k}>{k}</li>)}
    </ul>
  )
}

export default ObjectList;