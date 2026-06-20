# AGENTS.md

## Purpose

This project is developed with AI coding agents.

Agents must prioritize understanding the codebase before making changes.

---

# Before Making Changes

Always:

1. Analyze existing architecture
2. Search for existing implementations
3. Reuse existing components where possible
4. Follow established patterns
5. Minimize unnecessary changes

Do not introduce duplicate functionality.

---

# Change Philosophy

Prefer:

- Small focused changes
- Incremental improvements
- Minimal surface area modifications

Avoid:

- Large refactors unless requested
- Renaming files unnecessarily
- Reorganizing architecture without justification

---

# Existing Code Takes Priority

When extending functionality:

1. Follow existing patterns
2. Follow existing naming conventions
3. Follow existing folder organization

Do not introduce competing patterns.

---

# Component Development

Before creating:

- Component
- Hook
- Utility
- Service
- Type

Search for existing alternatives.

Reuse whenever possible.

---

# Dependencies

Before adding dependencies:

- Verify the functionality cannot be implemented using existing dependencies
- Prefer native browser APIs
- Prefer framework features
- Avoid dependency bloat

Every dependency must have clear justification.

---

# UI Development

All UI must be:

- Responsive
- Accessible
- Keyboard friendly
- Mobile first

Test layouts for:

- Mobile
- Tablet
- Desktop

---

# Performance

Avoid:

- Unnecessary rerenders
- Large client bundles
- Excessive client components

Prefer:

- Server Components
- Code splitting
- Lazy loading

---

# SEO

For public pages always verify:

- Metadata
- Open Graph
- Structured data
- Proper heading hierarchy
- Canonical URLs

---

# Before Completing Any Task

Verify:

- No TypeScript errors
- No lint errors
- No broken imports
- No dead code
- No console debugging statements
- Responsive layout works
- Accessibility remains intact

---

# Output Expectations

When completing a task:

Provide:

1. What changed
2. Why it changed
3. Important implementation details
4. Potential follow-up improvements

Keep explanations concise.

---

# Website Projects

For business websites prioritize:

1. Trust
2. Clarity
3. Conversion
4. Local SEO
5. Mobile experience

Every section should support conversion goals.

Avoid generic landing page designs.

---

# SaaS Projects

Prioritize:

1. User onboarding
2. Retention
3. Simplicity
4. Performance
5. Scalability

---

# AI Projects

Prioritize:

1. Reliability
2. Error handling
3. Transparency
4. Usage limits
5. Good loading states

Never assume model responses are reliable.
`<!-- BEGIN:nextjs-agent-rules -->`
