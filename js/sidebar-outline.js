/**
 * Sidebar Outline for Catholic Presentation Template
 * Synchronizes sidebar outline with slide content
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize once Reveal is fully loaded
  Reveal.addEventListener('ready', function() {
    initSidebar();
  });
});

function initSidebar() {
  // Create sidebar structure if it doesn't exist
  if (!document.getElementById('sidebar')) {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    
    const sidebarTitle = document.createElement('h3');
    sidebarTitle.textContent = 'Presentation Outline';
    sidebar.appendChild(sidebarTitle);
    
    const outline = document.createElement('ul');
    outline.id = 'outline';
    sidebar.appendChild(outline);
    
    document.body.appendChild(sidebar);
  }
  
  // Build outline from slide contents
  buildOutline();
  
  // Update the active section when the slide changes
  Reveal.addEventListener('slidechanged', function(event) {
    updateActiveSection(event.indexh, event.indexv);
  });
  
  // Initialize with the current slide
  const indices = Reveal.getIndices();
  updateActiveSection(indices.h, indices.v);
  
  // Update outline when fragments change
  Reveal.addEventListener('fragmentshown', function(event) {
    updateOutlineFragments(event);
  });
  
  Reveal.addEventListener('fragmenthidden', function(event) {
    updateOutlineFragments(event);
  });
}

function buildOutline() {
  const outlineList = document.getElementById('outline');
  const horizontalSlides = document.querySelectorAll('.reveal .slides > section');
  
  horizontalSlides.forEach(function(horizontalSlide, hIndex) {
    // Check if this is a slide stack (has vertical slides)
    const verticalSlides = horizontalSlide.querySelectorAll('section');
    
    if (verticalSlides.length > 0) {
      // This is a slide stack
      verticalSlides.forEach(function(verticalSlide, vIndex) {
        const outlineItem = createOutlineItem(verticalSlide, hIndex, vIndex);
        if (outlineItem) outlineList.appendChild(outlineItem);
      });
    } else {
      // This is a regular horizontal slide
      const outlineItem = createOutlineItem(horizontalSlide, hIndex, 0);
      if (outlineItem) outlineList.appendChild(outlineItem);
    }
  });
}

function createOutlineItem(slide, h, v) {
  // Skip slides that don't have data-outline attribute or title
  if (!slide.hasAttribute('data-outline') && 
      !slide.querySelector('h1, h2, h3, h4, h5, h6')) {
    return null;
  }
  
  const item = document.createElement('li');
  
  // Set the data attributes for indexing
  item.setAttribute('data-slide-h', h);
  item.setAttribute('data-slide-v', v);
  
  // Use data-outline attribute if available, otherwise use the first heading
  if (slide.hasAttribute('data-outline')) {
    item.textContent = slide.getAttribute('data-outline');
  } else {
    const heading = slide.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      item.textContent = heading.textContent;
    } else {
      item.textContent = `Slide ${h+1}.${v+1}`;
    }
  }
  
  // Add click event to navigate to this slide
  item.addEventListener('click', function() {
    Reveal.slide(h, v);
  });
  
  // Set default visibility state (initially hidden)
  item.classList.add('future');
  
  return item;
}

function updateActiveSection(h, v) {
  // Clear all active states
  document.querySelectorAll('#outline li').forEach(function(item) {
    item.classList.remove('active');
    
    // Check if this item should be visible based on slide progression
    const itemH = parseInt(item.getAttribute('data-slide-h'));
    const itemV = parseInt(item.getAttribute('data-slide-v'));
    
    if (itemH < h || (itemH === h && itemV <= v)) {
      item.classList.add('visible');
      item.classList.remove('future');
    } else {
      item.classList.remove('visible');
      item.classList.add('future');
    }
  });
  
  // Set active state for current slide
  const currentItem = document.querySelector(`#outline li[data-slide-h="${h}"][data-slide-v="${v}"]`);
  if (currentItem) {
    currentItem.classList.add('active');
    
    // Ensure the active item is visible in the sidebar (auto-scroll)
    currentItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function updateOutlineFragments(event) {
  // Find the fragment's corresponding outline item
  const slide = event.fragment.closest('section');
  let h, v;
  
  if (slide.parentNode.classList.contains('slides')) {
    // Direct child of .slides - horizontal slide
    h = Array.from(slide.parentNode.children).indexOf(slide);
    v = 0;
  } else {
    // Vertical slide
    const horizontalSlide = slide.parentNode;
    h = Array.from(horizontalSlide.parentNode.children).indexOf(horizontalSlide);
    v = Array.from(horizontalSlide.children).indexOf(slide);
  }
  
  // Get the item in our outline corresponding to this slide
  const outlineItem = document.querySelector(`#outline li[data-slide-h="${h}"][data-slide-v="${v}"]`);
  
  if (outlineItem) {
    // For fragments within slides, we could add nested items or update the existing one
    // Here, we'll just ensure the outline item for the current slide is visible
    if (event.type === 'fragmentshown') {
      outlineItem.classList.add('visible');
    }
  }
}
