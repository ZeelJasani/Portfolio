import type { Activity } from "@/components/kibo-ui/contribution-graph";
import { GITHUB_USERNAME } from "@/config/site";

type GitHubContributionsResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: {
            contributionDays: {
              date: string
              contributionCount: number
              color: string
              contributionLevel: string
            }[]
          }[]
        }
      }
    }
  }
}

const GITHUB_API_URL = 'https://api.github.com/graphql'

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

export async function getGitHubContributions() {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

  if (!token) {
    throw new Error('GitHub token is not configured')
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

  const res = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        username: GITHUB_USERNAME,
        from: "2026-01-01T00:00:00Z",
        to: "2026-12-31T23:59:59Z"
      },
    }),
    next: {
      revalidate: 3600,
      tags: ['github-contributions']
    },
  })

  if (!res.ok) {
    console.warn('Failed to fetch GitHub data, using fallback')
    return []
  }

  const json = (await res.json()) as GitHubContributionsResponse
  const data = json.data

  if (!data?.user) {
    return []
  }

  const contributions = data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVEL_MAP[day.contributionLevel] ?? 0,
    }))
    .filter((day) => day.date.startsWith('2026'))

  return contributions as Activity[]
}
