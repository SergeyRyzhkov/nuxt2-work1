<template>
  <section class="w-full max-w-[584px]">
    <div>
      <h3 class="leading-48">Личные данные</h3>
    </div>
    <div class="mt-22">
      <PersonalForm/>
      <PasswordForm class="mt-62"/>
      <div class="flex items-center mt-60">
        <label class="toggle-control mt-[-13px]">
          <input type="checkbox" checked="checked">
          <span class="control"></span>
        </label>
        <span class="ml-20">Получать информацию о новинках и акциях</span>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "PersonalData"
}
</script>

<style lang="scss">

$toggle-height: 25px;
$toggle-gutter: 5px;
$toggle-radius: 50%;
$toggle-control-speed: .15s;
$toggle-control-ease: ease-in;

$toggle-control-size: $toggle-height - ($toggle-gutter * 2);

.toggle-control {
  display: block;
  position: relative;
  padding-left: 54px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;


  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input ~ .control {
    &:after {
      left: 3px;
      background-color: white;
    }
  }

  input:checked ~ .control {
    background-color: transparent;

    &:after {
      left: 29px;
      background-color: #333333;

    }
  }

  .control {
    border: 2px solid #333333;
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 54px;
    border-radius: 12.5px;
    background-color: #333333;
    transition: background-color .15s ease-in;

    &:after {
      content: "";
      position: absolute;
      left: 5px;
      top: 1px;
      width: 19px;
      height: 19px;
      border-radius: 12.5px;
      background: #333333;
      transition: left .15s ease-in;
    }
  }
}

</style>
