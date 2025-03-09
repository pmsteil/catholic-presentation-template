/**
 * Sidebar Outline for Catholic Presentation Template
 * Synchronizes sidebar outline with slide content
 * Royal Gothic Gold Theme
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize once Reveal is fully loaded
  Reveal.addEventListener('ready', function() {
    initSidebar();
    console.log('Sidebar initialized');
  });
  
  // Also try to initialize immediately
  setTimeout(function() {
    initSidebar();
    console.log('Sidebar initialized via timeout');
  }, 1000);
});

function initSidebar() {
  // The sidebar is now part of the HTML structure
  // We just need to ensure the outline element exists
  if (!document.getElementById('outline')) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      const outline = document.createElement('ul');
      outline.id = 'outline';
      sidebar.appendChild(outline);
    }
  }
  
  // Clear any existing outline items
  const outlineElement = document.getElementById('outline');
  if (outlineElement) {
    outlineElement.innerHTML = '';
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
  
  // Create a link element for better interactivity
  const link = document.createElement('a');
  link.href = '#/' + h + '/' + v;
  
  // Use data-outline attribute if available, otherwise use the first heading
  if (slide.hasAttribute('data-outline')) {
    link.textContent = slide.getAttribute('data-outline');
  } else {
    const heading = slide.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      link.textContent = heading.textContent;
    } else {
      link.textContent = `Slide ${h+1}.${v+1}`;
    }
  }
  
  // Add the link to the list item
  item.appendChild(link);
  
  // Add click event to navigate to this slide
  link.addEventListener('click', function(e) {
    e.preventDefault();
    Reveal.slide(h, v);
    console.log('Navigating to slide', h, v);
  });
  
  // Set default visibility state (initially hidden)
  item.classList.add('future');
  
  // Log for debugging
  console.log('Created outline item:', link.textContent, 'for slide', h, v);
  
  return item;
}

function updateActiveSection(h, v) {
  // Clear all active states
  document.querySelectorAll('#outline li').forEach(function(item) {
    item.classList.remove('active');
    item.classList.remove('visible');
    item.classList.remove('past');
    item.classList.remove('future');
  });
  
  // Set active state for current slide and make all items visible
  const currentItem = document.querySelector(`#outline li[data-slide-h="${h}"][data-slide-v="${v}"]`);
  
  // Make all items visible but with different opacity levels
  document.querySelectorAll('#outline li').forEach(function(item) {
    const itemH = parseInt(item.getAttribute('data-slide-h'));
    const itemV = parseInt(item.getAttribute('data-slide-v'));
    
    // Always show all items, but style them differently based on position
    item.classList.add('visible');
    
    // Add a class to indicate if this item is before or after the current slide
    if (itemH < h || (itemH === h && itemV < v)) {
      item.classList.add('past');
    } else if (itemH > h || (itemH === h && itemV > v)) {
      item.classList.add('future');
    }
  });
  
  if (currentItem) {
    currentItem.classList.add('active');
    
    // Ensure the active item is visible in the sidebar (auto-scroll)
    currentItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Log for debugging
    console.log('Active slide:', h, v, currentItem.textContent);
  } else {
    console.log('No matching outline item for slide:', h, v);
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
