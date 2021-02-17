<script>
    export let url
</script>

<form
  action="{url}"
  method="POST"
>
  <label>
      <div>
          Your email:
      </div>
    <input type="text" name="_replyto" class="w-full">
  </label>
  <label>
      <div>
          Your message:

      </div>
    <textarea name="message" class="w-full"></textarea>
  </label>

  <!-- your other form fields go here -->

  <button type="submit">Send</button>
</form>

