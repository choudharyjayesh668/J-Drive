# J-Drive — Frontend Design System

## 1. Purpose

This document is the visual source of truth for the J-Drive frontend.

Use it together with the Tasteful Frontend / Taste Skill v2 methodology.

The goal is to create a polished, editorial, cinematic interface that feels intentional and premium while remaining simple and usable.

Do not copy the reference site's florist branding, names, content, imagery, or business claims. Adapt the visual language to the real J-Drive product.

---

# 2. Core Design Direction

J-Drive should feel:

- Editorial
- Cinematic
- Minimal
- Premium
- Calm
- Spacious
- Art-directed
- Modern
- Intentional

Avoid a generic SaaS/dashboard appearance.

Avoid:

- excessive cards
- excessive rounded containers
- excessive shadows
- random gradients
- unnecessary glassmorphism
- dense dashboard layouts
- decorative UI with no purpose
- excessive animation

The interface should rely on:

- strong typography
- large whitespace
- restrained color
- clear hierarchy
- asymmetric/editorial composition
- subtle borders
- cinematic visual treatment
- smooth motion

---

# 3. Visual Language

The reference design uses a strong contrast between light and dark sections.

Use:

- off-white/light backgrounds for content-heavy sections
- near-black/dark sections for dramatic transitions
- muted gray supporting text
- strong black/dark primary text on light backgrounds
- white/light primary text on dark backgrounds

J-Drive's own brand identity must remain intact.

Do not copy the reference brand's logo or color identity.

---

# 4. Typography

Typography should be highly editorial.

### Primary headings

- Large
- Bold
- Strong visual weight
- Tight/controlled line-height
- Strong contrast against surrounding content

### Secondary/editorial headings

Where appropriate, use a lighter or more expressive treatment to create contrast with the primary heading.

### Body text

- Smaller than headings
- Muted when secondary
- Comfortable line-height
- Avoid excessively wide text columns

### Navigation

- Small-to-medium text
- Medium weight
- Restrained
- Clear hierarchy

### General rule

Use typography as a major visual element, not just as information.

Large headings should create visual structure and whitespace should surround them.

---

# 5. Layout

Use generous whitespace throughout the application.

Prefer:

- wide content areas
- controlled max-width containers
- strong horizontal alignment
- asymmetric/editorial compositions where appropriate
- intentional vertical rhythm

Do not compress content unnecessarily.

The page should breathe.

---

# 6. Hero / Landing Page

The J-Drive landing page should use the editorial/cinematic language established by the reference.

### Composition

- Full-width hero
- Strong visual background or product visual
- Dark cinematic treatment when using imagery
- Large headline
- Supporting description
- Primary CTA
- Secondary CTA where appropriate
- Strong negative space

The hero should not look like a generic SaaS hero with three cards underneath it.

### Background treatment

When using imagery:

- image can fill the viewport
- use a dark overlay/gradient where necessary for readability
- preserve visual detail
- allow imagery to feel atmospheric
- do not make the image look like a normal boxed card

### Hero typography

- oversized
- bold
- high contrast
- editorial
- carefully controlled line length

---

# 7. Navigation

The navigation should have two visual states.

## Hero / Top State

When positioned over a dark hero:

- transparent or visually integrated with the hero
- light logo/text
- restrained appearance

## Scrolled State

When scrolling into light sections:

- floating light/white navigation container
- dark logo/text
- rounded/pill-like container
- subtle shadow
- centered within the page rather than spanning edge-to-edge
- primary CTA remains visually distinct

### Transition

Do not abruptly replace the navbar.

Transition smoothly between states:

- background
- text color
- shadow
- position
- border/radius where necessary

The state change should feel continuous.

---

# 8. Navigation Entrance Animation

On initial page load:

```text
opacity: 0
translateY: -20px
        ↓
opacity: 1
translateY: 0
```

The navigation should gently descend into position while fading in.

Use an elegant ease-out.

Avoid an aggressive slide.

---

# 9. Buttons

Buttons should feel premium and restrained.

### Primary button

Typical visual direction:

- high contrast surface
- rounded/pill shape when appropriate
- clear typography
- comfortable horizontal padding
- no unnecessary decoration

### Secondary button

Can use:

- text treatment
- transparent background
- subtle underline
- restrained border

depending on the page and design context.

---

# 10. Magnetic / Cursor-Following Buttons

Primary interactive CTAs may use a subtle magnetic interaction.

When the pointer enters or approaches the interactive region:

- button moves subtly toward the pointer
- movement remains restrained
- response is smooth
- no abrupt jumps

When the pointer leaves:

- button smoothly returns to its original position

Conceptually:

```text
cursor approaches
      ↓
subtle button movement
      ↓
cursor leaves
      ↓
smooth return
```

Use spring-like or smooth eased motion.

Do not make the button follow the cursor excessively.

---

# 11. Global Scroll Reveal Animation

This is the primary content entrance animation.

Unless a section specifically requires another treatment, use:

```text
Initial:
opacity: 0
translateY: 30–50px

Final:
opacity: 1
translateY: 0
```

Content moves from bottom to top while fading in.

Characteristics:

- smooth
- subtle
- ease-out
- no bounce
- no aggressive movement
- premium pacing

This animation should be reused consistently across the site.

---

# 12. Staggered Reveal

When several related elements appear together, reveal them sequentially.

Example:

```text
Element 1
   ↓
small delay
   ↓
Element 2
   ↓
small delay
   ↓
Element 3
```

Use a restrained stagger.

Do not make every element animate independently with large delays.

The goal is a coordinated composition.

---

# 13. Image Hover Interaction

Images are important visual elements.

When hovering over a photographic/image-based component:

```text
scale(1)
   ↓
subtle zoom
   ↓
approximately scale(1.05–1.10)
```

Rules:

- zoom the image, not the surrounding layout
- keep the container size stable
- use `overflow: hidden`
- preserve rounded corners
- do not move surrounding elements
- use a smooth 400–700ms transition
- use an elegant ease-in-out/ease-out curve

The effect should make the image feel slightly closer to the viewer.

Avoid excessive zoom.

---

# 14. Image Entrance Animation

Image-based content should use the same global reveal language:

```text
opacity: 0
translateY: 30–50px
        ↓
opacity: 1
translateY: 0
```

For galleries and grids:

- reveal images sequentially
- use subtle stagger
- do not reveal every item simultaneously

This creates an editorial rhythm.

---

# 15. Editorial Image Grids

For visual/product/archive sections:

- use large imagery
- allow asymmetric layouts
- do not force every item into identical dimensions
- use generous gaps
- use rounded image corners
- minimize borders
- keep metadata restrained

The grid should feel curated rather than like a generic ecommerce catalog.

---

# 16. Image Cards

When text overlays an image:

- title positioned near lower-left
- supporting text beneath it when needed
- use white/light text on dark imagery
- use a subtle bottom gradient when needed for readability
- keep internal padding comfortable

The image remains the primary visual element.

---

# 17. Dark Cinematic Sections

Dark sections should use:

- near-black rather than unnecessarily harsh pure black
- white primary text
- muted gray secondary text
- subtle borders
- restrained decorative elements
- generous whitespace

They should feel cinematic rather than like a conventional dark dashboard.

---

# 18. Light Editorial Sections

Light sections should use:

- white or soft off-white background
- dark primary typography
- muted gray supporting text
- generous whitespace
- large imagery
- subtle shadows only when necessary

Avoid overly bright or sterile presentation.

---

# 19. Atmospheric Background Imagery

Large images can be integrated into the background rather than placed inside cards.

When used as atmosphere:

- lower opacity when necessary
- blend into gradients
- keep content readable
- allow image edges to extend beyond normal containers
- avoid making the image compete with the primary message

The image should feel part of the composition.

---

# 20. Statement / Transition Sections

Use centered editorial statements when appropriate.

Composition:

- large whitespace
- centered decorative mark when useful
- oversized heading
- narrow supporting paragraph
- atmospheric image behind or around content
- smooth dark-to-light transition when appropriate

### Background transition

A cinematic vertical transition may move through:

```text
near-black
    ↓
dark gray
    ↓
soft gray
    ↓
off-white
```

Do not use a hard color boundary.

---

# 21. Process / Timeline Sections

For process-style content:

- use a dark/near-black section
- large editorial heading on one side
- numbered process points on the other
- generous vertical spacing
- circular number indicators
- subtle vertical connector lines
- white primary text
- muted gray descriptions

### Number indicators

- circular
- subtle border
- restrained contrast
- small centered number

### Process animation

Reveal points individually.

Each point uses:

```text
opacity: 0
translateY: 30–50px
        ↓
opacity: 1
translateY: 0
```

Reveal order:

```text
01
 ↓
02
 ↓
03
```

The number, title, and description should feel like one coordinated reveal.

---

# 22. Archive / Gallery Sections

Use:

- light/off-white background
- large editorial heading
- short supporting description
- large whitespace
- asymmetric image grid
- rounded image containers
- minimal metadata

Archive/gallery imagery should use the standard image hover zoom and scroll reveal.

---

# 23. CTA Sections

Large final CTAs can use:

- full-bleed photographic backgrounds
- dark cinematic overlay
- rounded outer container
- centered content
- large white heading
- narrow supporting paragraph
- prominent primary action

The CTA should feel like a final visual statement.

---

# 24. Forms

Forms should follow the same editorial restraint.

Inputs should have:

- clear typography
- comfortable padding
- subtle border
- appropriate radius
- strong focus state
- clean error state
- no unnecessary decoration

Do not make forms look like generic dashboard forms.

---

# 25. Modals

Modals should be clean and centered.

Use:

- strong but restrained backdrop
- white/light surface for light-theme dialogs
- comfortable padding
- clear hierarchy
- rounded corners
- obvious primary/secondary actions

Delete confirmation dialogs must clearly communicate destructive consequences.

Avoid overly dramatic animations.

Use a subtle fade + upward reveal.

---

# 26. Notifications / Popups

Notifications should be:

- compact
- clear
- unobtrusive
- visually consistent with the design system

Use subtle entrance motion.

Do not allow notifications to dominate the screen.

---

# 27. J-Drive Homepage

The homepage should visually translate the editorial design language into the actual J-Drive product.

Use:

- generous whitespace
- strong heading hierarchy
- elegant folder presentation
- restrained controls
- clear folder actions
- refined empty states
- subtle hover interactions

Do not turn it into a dense file-manager dashboard.

---

# 28. J-Drive Folder Page

The folder page should maintain the same design language.

Style:

- folder header
- upload area
- selected files
- upload progress
- file list
- actions
- preview states
- empty states

Use strong typography and whitespace.

The interface should remain simple and calm even when displaying many files.

---

# 29. File Preview

### Images

- Open in a centered modal.
- Do not make the image unnecessarily fill the entire viewport.
- Image should fit naturally within the available preview area.
- Avoid internal scrolling for normal image previews.
- Preserve aspect ratio.
- Use `object-fit: contain`.

### PDF

- Centered modal.
- Large enough to read comfortably.
- Avoid unnecessary page-level scrolling outside the document viewer.

### Video

When supported:

- centered preview
- native playback controls
- play/pause
- timeline
- seek
- volume
- fullscreen

The preview should follow the same clean modal language.

---

# 30. Responsive Design

The design must work across:

- desktop
- laptop
- tablet
- mobile

Do not simply shrink desktop layouts.

Adapt:

- navigation
- typography
- spacing
- image grids
- folder cards
- file rows
- forms
- modals
- CTA layouts
- preview areas

Avoid horizontal overflow.

On mobile, preserve the hierarchy and visual intent rather than trying to preserve desktop geometry exactly.

---

# 31. Accessibility / Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is requested:

- minimize transforms
- remove unnecessary stagger
- reduce animation duration
- preserve usability

Maintain:

- visible focus states
- readable contrast
- usable controls
- semantic interactive elements

---

# 32. Motion System Summary

### Standard reveal

```text
opacity: 0
translateY: 30–50px

        ↓

opacity: 1
translateY: 0
```

### Navigation entrance

```text
opacity: 0
translateY: -20px

        ↓

opacity: 1
translateY: 0
```

### Image hover

```text
scale(1)
        ↓
scale(1.05–1.10)
```

### Button magnetic interaction

```text
pointer approaches
        ↓
subtle movement toward pointer
        ↓
pointer leaves
        ↓
smooth return
```

### General motion principles

- smooth
- restrained
- intentional
- editorial
- premium
- no bounce unless explicitly needed
- no excessive movement
- no animation for decoration alone

---

# 33. Component Consistency

The same visual rules must be reused across:

- navbar
- buttons
- forms
- cards
- modals
- notifications
- image containers
- headings
- body text
- actions
- empty states

Do not create a different design language for each page.

---

# 34. J-Drive Content Rules

The visual reference must be adapted to J-Drive.

Do not copy:

- florist terminology
- florist branding
- florist imagery
- florist product names
- fake testimonials
- fake statistics
- fake customer logos
- unsupported product claims

Use only real J-Drive functionality and terminology.

The design should make J-Drive feel like the same type of premium, editorially designed product represented by the reference, while remaining unmistakably J-Drive.

---

# 35. Implementation Rules for Tasteful Frontend

When implementing this document:

1. Read this entire design.md first.
2. Use the Tasteful Frontend / Taste Skill v2 methodology.
3. Inspect the existing J-Drive frontend before changing it.
4. Preserve existing functionality.
5. Apply the visual system consistently across every page.
6. Prefer reusable components and shared design tokens.
7. Avoid unnecessary dependencies.
8. Verify the actual rendered UI.
9. Test desktop and mobile.
10. Perform a final visual consistency audit.

The final result should feel like a deliberate product design system, not a collection of individually generated pages.

---

# 36. Final Quality Bar

Before considering the design complete, verify:

- Does the entire product feel cohesive?
- Does the landing page match the application?
- Are typography and spacing consistent?
- Are light and dark sections balanced?
- Are images treated consistently?
- Do scroll reveals use the same motion language?
- Do image hovers use the same zoom language?
- Does the navbar transition naturally?
- Do buttons feel interactive but restrained?
- Are modals clean?
- Are mobile layouts intentional?
- Is there unnecessary visual noise?
- Does the interface feel editorial rather than generic?
- Has existing functionality remained intact?

The final J-Drive interface should feel polished, cinematic, minimal, spacious, and intentional.