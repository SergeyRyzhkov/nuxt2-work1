<template>
  <footer class="container-fluid bg-primary">
    <div class="container flex flex-col items-start justify-between pt-20 pb-10 lg:flex-row lg:pt-40 lg:pb-20">
      <div class="flex w-full flex-col lg:w-auto lg:min-w-[206px] xl:min-w-[306px]">
        <footer-logo></footer-logo>
        <footer-subscribe class="mt-22 lg:mt-45" />
      </div>
      <div class="flex w-full lg:justify-end">
        <div class="mt-40 flex w-full flex-col items-start justify-between lg:mt-0 lg:w-11/12 lg:flex-row xl:w-10/12">
          <footer-about></footer-about>
          <footer-info class="lg:ml-20"></footer-info>
          <footer-contacts class="flex-shrink-0 lg:ml-20"></footer-contacts>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-0 border-b border-footer-color md:mt-82"></div>
    <FooterLast class="container flex py-18 md:pt-22 md:pb-26"></FooterLast>
  </footer>
</template>

<style lang="scss">
.footer-title {
  @include widescreen {
    margin-bottom: 28px;
    padding: 0;
    width: auto;
  }
  svg {
    cursor: pointer;
  }
  svg.show {
    > rect:first-child {
      display: none;
    }
  }
  width: 100%;
  padding: 14px 0;
  color: white;
}
.footer-menu-list {
  border-bottom: 1px solid #575555;
  @include widescreen {
    border-bottom: none;
    width: auto;
  }
  width: 100%;
}
.footer-ul {
  color: $footer-color;
  font-size: 14px;
  max-height: 0;
  overflow: hidden;
  transition: 0.3s;
  @include widescreen {
    max-height: none !important;
    padding-bottom: 0;
  }
  &.show {
    max-height: 300px;
    padding-bottom: 24px;
  }
  > li + li {
    cursor: pointer;
    margin-top: 13px;
  }
}
</style>
