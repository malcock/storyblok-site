// Turns a Storyblok multilink value into an href.
export function linkHref(link) {
	if (!link) return null;
	if (link.linktype === 'email') return link.email ? `mailto:${link.email}` : null;
	if (link.linktype === 'story') {
		const path = link.story?.full_slug ?? link.cached_url;
		if (!path) return null;
		return path === 'home' ? '/' : `/${path.replace(/^\//, '')}`;
	}
	return link.url || link.cached_url || null;
}

// Path to a resolved project story.
export function storyHref(story) {
	return story?.full_slug ? `/${story.full_slug}` : null;
}

// A project gets its own page only when its case-study body has blocks.
export function hasCaseStudy(story) {
	return Array.isArray(story?.content?.body) && story.content.body.length > 0;
}
