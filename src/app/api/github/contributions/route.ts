// import { NextResponse } from 'next/server'

// const GITHUB_API_URL = 'https://api.github.com/graphql'
// const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN

// export async function POST(request: Request) {
//   try {
//     const { username } = await request.json()

//     if (!username) {
//       return NextResponse.json(
//         { error: 'GitHub username is required' },
//         { status: 400 }
//       )
//     }

//     if (!GITHUB_TOKEN) {
//       console.error('GitHub token is not configured')
//       return NextResponse.json(
//         { error: 'Server configuration error' },
//         { status: 500 }
//       )
//     }

//     const query = `
//       query($username: String!) {
//         user(login: $username) {
//           contributionsCollection {
//             contributionCalendar {
//               totalContributions
//               weeks {
//                 contributionDays {
//                   date
//                   contributionCount
//                   color
//                   contributionLevel
//                 }
//               }
//             }
//           }
//         }
//       }
//     `

//     const response = await fetch(GITHUB_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${GITHUB_TOKEN}`,
//       },
//       body: JSON.stringify({
//         query,
//         variables: { username },
//       }),
//     })

//     if (!response.ok) {
//       const error = await response.text()
//       console.error('GitHub API error:', error)
//       return NextResponse.json(
//         { error: 'Failed to fetch GitHub data' },
//         { status: response.status }
//       )
//     }

//     const { data, errors } = await response.json()

//     if (errors) {
//       console.error('GitHub GraphQL errors:', errors)
//       return NextResponse.json(
//         { error: 'Error processing GitHub data' },
//         { status: 500 }
//       )
//     }

//     // Flatten the weeks array into a single array of contribution days
//     const contributions = data.user.contributionsCollection.contributionCalendar.weeks
//       .flatMap((week: any) => week.contributionDays)
//       .map((day: any) => ({
//         date: day.date,
//         contributionCount: day.contributionCount,
//         color: day.color,
//         contributionLevel: day.contributionLevel,
//       }))

//     return NextResponse.json({ contributions })
//   } catch (error) {
//     console.error('Error in GitHub contributions API route:', error)
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }







// src/app/api/github/contributions/route.ts
import { NextResponse } from 'next/server'

const GITHUB_API_URL = 'https://api.github.com/graphql'
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN

interface RequestBody {
  username: string
}

interface GitHubResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: Array<{
            contributionDays: Array<{
              date: string
              contributionCount: number
              color: string
              contributionLevel: string
            }>
          }>
        }
      }
    }
  }
  errors?: Array<{ message: string }>
}

export async function POST(request: Request) {
  try {
    const { username } = (await request.json()) as RequestBody

    if (!username) {
      return NextResponse.json(
        { error: 'GitHub username is required' },
        { status: 400 }
      )
    }

    if (!GITHUB_TOKEN) {
      console.error('GitHub token is not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: "2026-01-01T00:00:00Z",
          to: "2026-12-31T23:59:59Z"
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('GitHub API error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch GitHub data' },
        { status: response.status }
      )
    }

    const { data, errors } = (await response.json()) as GitHubResponse

    if (errors || !data) {
      console.error('GitHub GraphQL errors:', errors)
      return NextResponse.json(
        { error: 'Error processing GitHub data' },
        { status: 500 }
      )
    }

    const contributions = data.user.contributionsCollection.contributionCalendar.weeks
      .flatMap(week => week.contributionDays)
      .map(day => ({
        date: day.date,
        contributionCount: day.contributionCount,
        color: day.color,
        contributionLevel: day.contributionLevel,
      }))
      .filter(day => day.date.startsWith('2026'))

    return NextResponse.json({
      contributions,
      total: data.user.contributionsCollection.contributionCalendar.totalContributions
    })
  } catch (error) {
    console.error('Error in GitHub contributions API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}