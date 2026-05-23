// ─── Mock contract data ───────────────────────────────────────────────────────
// Mirrors the exact struct shapes of KrypSwiftGovernance.sol and
// KrypSwiftCommunityFund.sol.
// Fully compliant under the V1 Constitution — free from banned terminology.

// ── Governance enums ──────────────────────────────────────────────────────────
export enum ProposalStatus {
  PENDING, APPROVED, EXECUTED, REJECTED, CANCELLED, EXPIRED, VETOED,
}

export enum ProposalType {
  SET_COMMITMENT_FLOOR,
  SET_RECIPIENT_SCHEDULE,
  SET_PUBLIC_GOODS_RECIPIENTS,
  SET_COMMUNITY_FUND_PARAMS,
  EMERGENCY_PAUSE,
  EMERGENCY_UNPAUSE,
  UPDATE_GOV_PARAMS,
  SET_MAX_STAKE_PER_WALLET,
  SET_MAX_ROLLOVER_DRAWS,
  SET_MAX_VOTE_WEIGHT_BPS,
  MIGRATE_CHAIN,
}

export const PROPOSAL_TYPE_LABELS: Record<ProposalType, string> = {
  [ProposalType.SET_COMMITMENT_FLOOR]:        'Commitment Floor',
  [ProposalType.SET_RECIPIENT_SCHEDULE]:      'Recipient Schedule',
  [ProposalType.SET_PUBLIC_GOODS_RECIPIENTS]:  'Public Goods Recipients',
  [ProposalType.SET_COMMUNITY_FUND_PARAMS]:   'Community Fund Params',
  [ProposalType.EMERGENCY_PAUSE]:             'Emergency Pause',
  [ProposalType.EMERGENCY_UNPAUSE]:           'Emergency Unpause',
  [ProposalType.UPDATE_GOV_PARAMS]:           'Governance Params',
  [ProposalType.SET_MAX_STAKE_PER_WALLET]:    'Max Stake per Wallet',
  [ProposalType.SET_MAX_ROLLOVER_DRAWS]:      'Max Rollover Draws',
  [ProposalType.SET_MAX_VOTE_WEIGHT_BPS]:     'Vote Weight Cap',
  [ProposalType.MIGRATE_CHAIN]:               'Chain Migration',
}

// ── Community fund enums ──────────────────────────────────────────────────────
export enum AllocationStatus {
  OPEN, IDEA_VOTING, IDEA_LOCKED, DELIVERED, SPLIT_DISPUTE, PAID, BURNED,
}

export const ALLOCATION_STATUS_LABELS: Record<AllocationStatus, string> = {
  [AllocationStatus.OPEN]:          'Open for Ideas',
  [AllocationStatus.IDEA_VOTING]:   'Idea Voting',
  [AllocationStatus.IDEA_LOCKED]:   'Building',
  [AllocationStatus.DELIVERED]:     'Under Review',
  [AllocationStatus.SPLIT_DISPUTE]: 'Split Dispute',
  [AllocationStatus.PAID]:          'Paid',
  [AllocationStatus.BURNED]:        'Burned',
}

// ── Interfaces (match on-chain structs) ───────────────────────────────────────
export interface MockProposal {
  id: number
  proposalType: ProposalType
  description: string
  votingDeadline: number    // unix ms
  votesFor: number          // KPS (display units, not wei)
  votesAgainst: number
  totalVoteWeight: number
  snapshotTotalStaked: number
  status: ProposalStatus
  quorumBps: number         // e.g. 500 = 5%
  approvalThresholdBps: number // e.g. 6000 = 60%
}

export interface MockIdea {
  submitter: string
  title: string
  votes: number  // KPS vote weight accumulated
}

export interface MockAllocation {
  id: number
  status: AllocationStatus
  ideaTitle: string
  openedAt: number         // unix ms
  ideaVotingEnd: number    // unix ms
  ideaCount: number
  ideas: MockIdea[]
  totalPaidOut: number     // KPS
  totalBurned: number      // KPS
  allocationAmount: number // always 50,000 KPS per ALLOCATION_AMOUNT constant
  totalAllocations: number // 200 max (TOTAL_ALLOCATIONS)
}

export interface MockGovStats {
  totalStaked: number      // KPS
  proposalCount: number
  activeCount: number
  quorumBps: number
  approvalBps: number
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const now = Date.now()
const day = 86_400_000

export const mockProposals: MockProposal[] = [
  {
    id: 1,
    proposalType: ProposalType.SET_COMMITMENT_FLOOR,
    description: 'Raise the minimum loyalty stake from 5,000 to 7,500 KPS to strengthen KPS Draw eligibility and encourage participants to Commit long-term.',
    votingDeadline: now + 3 * day,
    votesFor: 2_340_000,
    votesAgainst: 890_000,
    totalVoteWeight: 3_230_000,
    snapshotTotalStaked: 12_500_000,
    status: ProposalStatus.PENDING,
    quorumBps: 500,
    approvalThresholdBps: 6000,
  },
  {
    id: 2,
    proposalType: ProposalType.SET_MAX_ROLLOVER_DRAWS,
    description: 'Reduce the maximum KPS Draw rollover from 10 to 6 months to keep the Bonus Reward Pool from accumulating excessively across consecutive KPS Draws.',
    votingDeadline: now + 5 * day,
    votesFor: 1_870_000,
    votesAgainst: 1_210_000,
    totalVoteWeight: 3_080_000,
    snapshotTotalStaked: 12_500_000,
    status: ProposalStatus.PENDING,
    quorumBps: 500,
    approvalThresholdBps: 6000,
  },
  {
    id: 3,
    proposalType: ProposalType.SET_PUBLIC_GOODS_RECIPIENTS,
    description: 'Designate the Irish Society for the Prevention of Cruelty to Children (ISPCC) and Trees for the Future as the Year 1 Public Goods Recipient organizations.',
    votingDeadline: now + 6 * day,
    votesFor: 4_100_000,
    votesAgainst: 320_000,
    totalVoteWeight: 4_420_000,
    snapshotTotalStaked: 12_500_000,
    status: ProposalStatus.PENDING,
    quorumBps: 500,
    approvalThresholdBps: 6000,
  },
]

export const mockAllocation: MockAllocation = {
  id: 4,
  status: AllocationStatus.IDEA_VOTING,
  ideaTitle: '',
  openedAt: now - 16 * day,
  ideaVotingEnd: now + 4 * day + 12 * 3_600_000,
  ideaCount: 3,
  ideas: [
    {
      submitter: '0xA1b2...C3d4',
      title: 'KPS Mobile Staking Dashboard — iOS & Android native app with biometric auth and real-time reward tracking.',
      votes: 4_220,
    },
    {
      submitter: '0xE5f6...G7h8',
      title: 'On-chain Governance Analytics — public dashboard indexing all proposals, voter turnout, and pass-rate trends.',
      votes: 3_140,
    },
    {
      submitter: '0xI9j0...K1l2',
      title: 'LayerZero Bridge UI — one-click KPS teleportation across Base, Ethereum, BSC, and Polygon.',
      votes: 1_860,
    },
  ],
  totalPaidOut: 150_000,
  totalBurned: 0,
  allocationAmount: 50_000,
  totalAllocations: 200,
}

export const mockGovStats: MockGovStats = {
  totalStaked: 12_500_000,
  proposalCount: 3,
  activeCount: 3,
  quorumBps: 500,
  approvalBps: 6000,
}

// ── Helpers ───────────────────────────────────────────────────────────────────
export function msToCountdown(ms: number): string {
  if (ms <= 0) return 'Closed'
  const days  = Math.floor(ms / day)
  const hours = Math.floor((ms % day) / 3_600_000)
  if (days > 0) return `${days}d ${hours}h`
  const mins = Math.floor((ms % 3_600_000) / 60_000)
  return `${hours}h ${mins}m`
}

export function votePct(for_: number, against: number): number {
  const total = for_ + against
  if (total === 0) return 0
  return Math.round((for_ / total) * 100)
}

export function quorumReached(p: MockProposal): boolean {
  const required = Math.floor((p.snapshotTotalStaked * p.quorumBps) / 10_000)
  return p.totalVoteWeight >= required
}
