import type { Activity } from "@/components/kibo-ui/contribution-graph";
import { GITHUB_USERNAME } from "@/config/site";

const GITHUB_API_URL = 'https://github-contributions-api.deno.dev'

type GitHubContributionsResponse = {
  contributions: Array<Array<{
    date: string
    contributionCount: number
    contributionLevel: string
  }>>
  totalContributions: number
}

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

export async function getGitHubContributions() {
  try {
    const res = await fetch(`${GITHUB_API_URL}/${GITHUB_USERNAME}.json`, {
      next: {
        revalidate: 3600,
        tags: ['github-contributions']
      },
    })

    if (!res.ok) {
      console.warn('Failed to fetch GitHub data')
      return []
    }

    const json = (await res.json()) as GitHubContributionsResponse
    
    const contributions = json.contributions
      .flat()
      .map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_MAP[day.contributionLevel] ?? 0,
      }))

    return contributions as Activity[]
  } catch (error) {
    console.warn('Error fetching GitHub contributions:', error)
    return []
  }
}
