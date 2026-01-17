<script lang="ts">
  /** Error message component with icon for form validation */
  export let id: string;
  export let message: string;
  export let ariaLabel: string | undefined = undefined;
</script>

<p 
  {id} 
  class="text-red-500 text-sm mt-1.5 flex items-center gap-1"
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  aria-label={ariaLabel ?? message}
>
  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
  </svg>
  {message}
</p>
