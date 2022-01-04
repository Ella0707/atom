const breakpoint = window.matchMedia('(max-width: 48em)');
const mediaQuery = breakpoint.matches;
const select_html = document.querySelector('html');
const body = document.querySelector('body')
let cusSlects = []
const closeCusSlects = () => {
    cusSlects.forEach(item => {
        item.close()
    })
}
select_html.addEventListener('click', function (e) {
    if (!e.target.closest('.cus-select')) {
        closeCusSlects();
    }
})
class Select {
    constructor(selector, options = {}) {
        this.$element = document.querySelector(selector)
        this.options = options
        this.setUp();
    }
    setUp() {
        if (this.$element) {
            this.$header = this.$element.querySelector('.cus-select__header')
            this.$search = this.$element.querySelector('.cus-select__search input')
            this.$drop = this.$element.querySelector('.cus-select__drop')
            this.$reset = this.$element.querySelector('.cus-select__reset')
            this.$all = this.$element.querySelector('.cus-select__input--all')
            this.$notfound = this.$element.querySelector('.cus-select__notfound')
            this.$val = this.$element.querySelector('.cus-select__val')
            //this.$inputVal = this.$element.querySelector('.cus-select__input-val')
            this.$autolocal = this.$element.querySelector('.cus-select__autolocal')
            this.$checkboxes = this.$element.querySelectorAll('.cus-select__input[type="checkbox"]')
            this.$radio = this.$element.querySelectorAll('.cus-select__input[type="radio"]')
            this.$items = this.$element.querySelectorAll('.cus-select__item')
            this.$indicator = this.$element.querySelectorAll('.cus-select__g--hendler input')
            this.$gtitles = this.$element.querySelectorAll('.cus-select__gtitle')
            this.notfound = false;
            this.changeValue = this.options.changeValue;
            this.noinput = this.options.noinput;
            this.local = this.options.local;
            this.defaultVal = this.$val.textContent;
            this.value = this.$val.textContent;
            this.toggleHendler();
            this.resetHendler();
            this.selectAllHendler();
            this.searchHendler();
            this.titleHendler();
            this.indicatorHendler();
            cusSlects.push(this)
        }

    }
    update() {
        this.$checkboxes = this.$element.querySelectorAll('.cus-select__input[type="checkbox"]')
    }
    toggleHendler() {
        this.$header.addEventListener('click', (e) => {
            e.preventDefault()
            this.toggle()
        })
    }
    resetHendler() {
        this.$reset ? this.$reset.addEventListener('click', (e) => {
            e.preventDefault()
            this.reset()
        }) : null;
    }
    selectAllHendler() {
        this.$all ? this.$all.addEventListener('change', (e) => {
            e.preventDefault()
            if (this.$all.checked) {
                this.selectAll()
            } else {
                this.reset()
            }
        }) : null;
    }
    titleHendler() {
        if (this.changeValue) {
            this.$radio.forEach(item => {
                item.addEventListener('change', (e) => {
                    if (item.checked) {
                        this.$val.textContent = item.value;
                    }
                })
            })
        }
        if (this.noinput) {
            this.$items.forEach(item => {
                item.addEventListener('click', (e) => {
                    this.selectDiv(item)
                })
            })
        }
        if (this.local) {
            this.$autolocal.addEventListener('click', () => {
                this.autolocal()
            })
        }
    }
    indicatorHendler() {
        this.$indicator.forEach(item => {
            item.addEventListener('change', (e) => {
                this.indicator()
            })
        })
    }
    searchHendler() {
        this.$search ? this.$search.addEventListener('input', (e) => {
            e.preventDefault()
            this.$search.value = this.$search.value.trim()
            this.search()
            if (this.$search.value == '') {
                this.$gtitles.forEach(item => {
                    item.classList.remove('hide')
                })
            } else {
                this.$gtitles.forEach(item => {
                    item.classList.add('hide')
                })
            }
        }) : null;
    }
    get isOpen() {
        return this.$element.classList.contains('open')
    }
    indicator() {
        for (let i = 0; i < this.$indicator.length; i++) {
            if (this.$indicator[i].checked) {
                this.$element.classList.add('indicator');
                break;
            } else {
                this.$element.classList.remove('indicator');
            }
        }
    }
    autolocal() {
        this.$items.forEach(el => {
            el.classList.remove('selected')
        })
        this.$val.textContent = this.defaultVal.trim();
        this.value = this.defaultVal;
        this.close()
        this.callBack()
    }
    selectDiv(item) {
        this.$items.forEach(el => {
            el.classList.remove('selected')
        })
        item ? item.classList.add('selected') : null;
        this.$val.textContent = item.textContent.trim();
        this.value = item.textContent.trim();
        this.callBack()
    }
    selectAll() {
        this.$checkboxes.forEach(item => {
            item.checked = true
        })
    }
    toggle() {
        this.closeAnothers()
        this.$element.classList.toggle('open')
        $(this.$drop).slideToggle()
    }
    open() {
        this.$element.classList.add('open')
        $(this.$drop).slideDown()
    }
    close() {
        this.$element.classList.remove('open')
        $(this.$drop).slideUp()
    }
    closeAnothers() {
        cusSlects.forEach(item => {
            if (item == this) {

            } else {
                item.close()
            }
        })
    }
    reset() {
        this.$checkboxes.forEach(item => {
            if (item.hasAttribute('checked')) {
                item.checked = true
            } else {
                item.checked = false
            }
        })
        this.$radio.forEach(item => {
            if (item.hasAttribute('checked')) {
                item.checked = true
            } else {
                item.checked = false
            }
        })
        this.value = this.defaultVal.trim();
        this.autolocal()
        this.indicator()
        this.callBack()
    }
    search() {
        let rex = new RegExp('.*(' + this.$search.value + ')+.*', 'i');
        this.$items.forEach(item => {
            if (rex.test(item.textContent.replace(/[^\wа-яё]+/gi, ""))) {
                item.classList.remove('hide')
            } else {
                item.classList.add('hide')
            }
        })
    }
    off() {
        this.$element.classList.add('disabled')
    }
    on() {
        this.$element.classList.remove('disabled')
    }
    callBack() {
        this.options.callBack ? this.options.callBack({
            element: this.$element,
            value: this.value,
            defaultVal: this.defaultVal,
        }) : null;
    }
}

class SelectCategoy {
    constructor(selector, options = {}) {
        this.$element = document.querySelector(selector)
        this.options = options
        this.setUp();
    }
    setUp() {
        if (this.$element) {
            this.$header = this.$element.querySelector('.cus-select__header')
            this.$search = this.$element.querySelector('.cus-select__search input')
            this.$drop = this.$element.querySelector('.cus-select__drop')
            this.$val = this.$element.querySelector('.cus-select__val')
            this.$checkboxes = this.$element.querySelectorAll('.cus-select__input[type="checkbox"]')
            this.$items = this.$element.querySelectorAll('.cus-select__item')
            this.$gtitles = this.$element.querySelectorAll('.cus-select__gtitle')
            this.$removeEl = document.querySelector(this.options.removeEl)
            this.$checkedEl = document.querySelector(this.options.checkedEl)
            this.toggleHendler();
            this.searchHendler();
            this.changeHendler();
            this.removeHendler();
            cusSlects.push(this)
        }

    }
    toggleHendler() {
        this.$header.addEventListener('click', (e) => {
            e.preventDefault()
            this.toggle()
        })
    }
    changeHendler() {
        this.$checkboxes.forEach(item => {
            item.addEventListener('change', (e) => {
                this.change()
            })
        })
    }
    searchHendler() {
        this.$search ? this.$search.addEventListener('input', (e) => {
            e.preventDefault()
            this.$search.value = this.$search.value.trim()
            this.search()
            if (this.$search.value == '') {
                this.$gtitles.forEach(item => {
                    item.classList.remove('hide')
                })
            } else {
                this.$gtitles.forEach(item => {
                    item.classList.add('hide')
                })
            }
        }) : null;
    }
    removeHendler() {
        this.$removeEl.addEventListener('click', (e) => {
            this.remove(e)
        })
    }
    change() {
        this.$removeEl.innerHTML = ''
        for (let i = 0; i < this.$checkboxes.length; i++) {
            if (this.$checkboxes[i].checked) {
                this.$removeEl.insertAdjacentHTML('beforeend', `
                <div class="performer-info__item">${this.$checkboxes[i].value}</div>
                `)
            }
        }
    }
    remove(e) {
        let target = e.target
        if (target.classList.contains('performer-info__item')) {
            target.remove()
            for (let i = 0; i < this.$checkboxes.length; i++) {
                if (this.$checkboxes[i].value == target.textContent) {
                    this.$checkboxes[i].checked = false
                }
            }
        }

    }
    selectAll() {
        this.$checkboxes.forEach(item => {
            item.checked = true
        })
    }
    toggle() {
        this.closeAnothers()
        this.$element.classList.toggle('open')
        $(this.$drop).slideToggle()
    }
    open() {
        this.$element.classList.add('open')
        $(this.$drop).slideDown()
    }
    close() {
        this.$element.classList.remove('open')
        $(this.$drop).slideUp()
    }
    closeAnothers() {
        cusSlects.forEach(item => {
            if (item == this) {

            } else {
                item.close()
            }
        })
    }
    search() {
        let rex = new RegExp('.*(' + this.$search.value + ')+.*', 'i');
        this.$items.forEach(item => {
            if (rex.test(item.textContent.replace(/[^\wа-яё]+/gi, ""))) {
                item.classList.remove('hide')
            } else {
                item.classList.add('hide')
            }
        })
    }
    off() {
        this.$element.classList.add('disabled')
    }
    on() {
        this.$element.classList.remove('disabled')
    }
}

class SelectServicePrice {
    constructor(selector, options = {}) {
        this.$element = document.querySelector(selector)
        this.options = options
        this.setUp();
    }
    setUp() {
        if (this.$element) {
            this.$header = this.$element.querySelector('.cus-select__header')
            this.$drop = this.$element.querySelector('.cus-select__drop')
            this.$val = this.$element.querySelector('.cus-select__val')
            this.$items = this.$element.querySelectorAll('.cus-select__item')
            this.$removeEl = document.querySelector(this.options.removeEl)
            this.$checkedEl = document.querySelector(this.options.checkedEl)
            this.type = this.options.type;
            this.defaultVal = this.$val.textContent;
            this.val = 'false';
            this.catID = 'false';
            this.toggleHendler();
            this.changeHendler();
            cusSlects.push(this)
        }

    }
    toggleHendler() {
        this.$header.addEventListener('click', (e) => {
            e.preventDefault()
            this.toggle()
        })
    }
    changeHendler() {
        this.$items.forEach(item => {
            item.addEventListener('click', (e) => {
                this.selectDiv(item)
            })
        })

    }
    callBack() {
        this.options.callBack ? this.options.callBack({
            element: this.$element,
            id: this.catID,
            title: this.val,
        }) : null;
    }
    selectDiv(item) {
        this.$items.forEach(el => {
            el.classList.remove('selected')
        })
        item ? item.classList.add('selected') : null;
        this.catID = item.getAttribute('data-cat')
        this.$val.setAttribute('data-cat', this.catID)
        this.val = item.textContent;
        this.$val.textContent = this.val;
        this.callBack()
    }
    reset() {
        this.$items.forEach(el => {
            el.classList.remove('selected')
        })
        this.catID = 'false'
        this.$val.setAttribute('data-cat', this.catID)
        this.$val.textContent = this.defaultVal;
        this.close()
        this.callBack()
    }
    toggle() {
        this.closeAnothers()
        this.$element.classList.toggle('open')
        $(this.$drop).slideToggle()
    }
    open() {
        this.$element.classList.add('open')
        $(this.$drop).slideDown()
    }
    close() {
        this.$element.classList.remove('open')
        $(this.$drop).slideUp()
    }
    closeAnothers() {
        cusSlects.forEach(item => {
            if (item == this) {

            } else {
                item.close()
            }
        })
    }
    off() {
        this.$element.classList.add('disabled')
    }
    on() {
        this.$element.classList.remove('disabled')
    }
}
const selService = new Select('.select--ser')
const selPerformerReview = new Select('.select--perf')
const selNumberView = new Select('.select--num', { changeValue: true })
const selPerformerReviewSort = new Select('.select--perf-sort', { changeValue: true })
const selFilter = new Select('.select--filter')
const selLocal = new Select('.select--local', { local: true, noinput: true })
const selCatagoryType = new SelectCategoy('.select--category-type', { removeEl: '.performer-info__list--remove', checkedEl: '.performer-info__list--checked' })
const selCatagoryTypePrice = new SelectServicePrice('.select--category-type-price', {
    type: 'category',
    callBack(data) {
        if (data.id == 'false') {
            selCatagoryTypeSer.reset()
            selCatagoryTypeSer.off()
            data.element.querySelectorAll('.cus-select__g').forEach(item => {
                item.classList.add('hide')
            })
        } else {
            selCatagoryTypeSer.reset()
            selCatagoryTypeSer.on()
            document.querySelectorAll('.select--category-type-ser .cus-select__g').forEach(item => {
                if (item.getAttribute('data-group') == data.id) {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            })
        }
        addSerPrice.check()
    }
})
const selCatagoryTypeSer = new SelectServicePrice('.select--category-type-ser', {
    type: 'underCatagery',
    callBack(data) {
        addSerPrice.check()
    }
})

const selAddAdv = new Select('.select--add-adv', { changeValue: true })
//selCatagoryTypeSer.off()

class AddServicePrice {
    constructor(selector, options) {
        this.$element = document.querySelector('.serpri-info__block--edit')
        this.setUp()
    }
    setUp() {
        if (this.$element) {
            this.$btn = this.$element.querySelector('.serpri-info__add-btn')
            this.$list = this.$element.querySelector('.serpri-info__list--edit')
            this.$comm = this.$element.querySelector('.serpri-info__comment')
            this.$currency = this.$element.querySelector('.serpri-info__currency')
            this.btnHendler()
            this.hendleres()

            this.comm = false;
            this.currency = false;
            this.removeHendler()
        }
    }
    btnHendler() {
        this.$btn.addEventListener('click', () => {
            this.addItem()
        })
    }
    hendleres() {
        this.$comm.addEventListener('input', () => {
            let text = this.$comm.value.trim()
            if (text != '' && text != ' ') {
                this.comm = true
            } else {
                this.comm = false
            }
            this.check()
        })
        this.$currency.addEventListener('input', () => {
            let text = this.$currency.value.trim()
            if (text != '' && text != ' ') {
                this.currency = true
            } else {
                this.currency = false
            }
            this.check()
        })
    }
    check() {
        if (this.comm && this.currency && selCatagoryTypePrice.val != 'false' && selCatagoryTypeSer.val != 'false') {
            this.btnOn()
        } else {
            this.btnOff()
        }
    }
    btnOn() {
        this.$btn.classList.remove('disabled')
    }
    btnOff() {
        this.$btn.classList.add('disabled')
    }
    removeHendler() {
        this.$list.addEventListener('click', (e) => {
            if (e.target.dataset.serpriceremove) {
                this.removeItem(e.target.dataset.serpriceremove)
            }
        })
    }
    removeItem(id) {
        this.$list.querySelector(`.serpri-info__item[data-serprice="${id}"]`).remove()
    }
    addItem() {
        let items = document.querySelectorAll('.serpri-info__list--edit .serpri-info__item')
        let id = items.length > 0 ? items[items.length - 1].getAttribute('data-serprice') : 0
        this.$list.insertAdjacentHTML('beforeend', this.getTemplate(+id + 1))
        //this.$file.value = ""
    }
    getTemplate(id) {
        return `
            <div class="serpri-info__item" data-serprice="${id}">
                <div class="serpri-info__remove" data-serpriceRemove="${id}"></div>
                <div class="serpri-info__cat-str">${selCatagoryTypePrice.val}</div>
                <div class="serpri-info__ser-str">${selCatagoryTypeSer.val}</div>
                <div class="serpri-info__com-str">${this.$comm.value}</div>
                <div class="serpri-info__price-str"> Цена до <span
                        class="serpri-info__price-sum">${this.$currency.value}</span>
                    <span class="serpri-info__price-cur">€</span>
                </div>
            </div>
        `;
    }
    reset() {
        this.$comm.value = ''
        this.$currency.value = ''
    }
}

const addSerPrice = new AddServicePrice()


function reviewView() {
    const reviewes = document.querySelector('.reviewes')
    const revieweItems = document.querySelectorAll('.reviewes__item')
    const radioButtons = document.querySelectorAll('.radio-view__input')
    if (!reviewes && !revieweItems[0] && !radioButtons[0]) return;
    radioButtons.forEach(item => {
        item.addEventListener('change', () => {
            radioButtons.forEach(i => {
                if (i.checked) {
                    if (i.value == 'row') {
                        reviewes.classList.add('reviewes--row')
                    }
                    if (i.value == 'grid') {
                        reviewes.classList.remove('reviewes--row')
                    }
                }
            })
        })
    })
}
reviewView()

// modal

class Modal {
    constructor(name) {
        this.name = name;
        this.modal = document.querySelector(`[data-modal="${name}"]`)
        this.body = document.querySelector(`body`)
        this.triggers = document.querySelectorAll(`[data-class="${name}"]`)
        this.openHendler()
        this.closeHendler()
    }
    open() {
        this.modal.classList.add('active')
        this.body.classList.add('o-hidden')
        //this.modal.addEventListener('click', this.closeHendler)
    }
    close() {
        this.modal.classList.remove('active')
        this.body.classList.remove('o-hidden')
        //this.modal.removeEventListener('click', this.closeHendler)
    }
    // success() {
    //     this.modal.classList.remove('error')
    //     this.modal.classList.add('success')
    // }
    // error() {
    //     this.modal.classList.remove('success')
    //     this.modal.classList.add('error')
    // }
    update() {
        this.modal = document.querySelector(`[data-modal="${this.name}"]`)
        this.triggers = document.querySelectorAll(`[data-class="${this.name}"]`)
        this.openHendler()
    }
    openHendler() {
        this.triggers.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                this.open()
            })
        })
    }
    closeHendler() {
        this.modal ? this.modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-x')) {
                this.close()
            }
        }) : null;
    }
}

const editAva = new Modal('edit-ava');
const accessToStatistics = new Modal('access-to-statistics');
const hideAddress = new Modal('hide-address');
const leaveReview = new Modal('leave-review');
const leaveReviewForPerformer = new Modal('leave-review-for-performer');
const leaveReviewForCustomer = new Modal('leave-review-for-customer');
const leaveReviewDone = new Modal('leave-review-done');
const deleteTask = new Modal('delete-task');
const deleteTaskConfirm = new Modal('delete-task-confirm');
const isTaskDone = new Modal('is-task-done');
const telConfirm = new Modal('tel-confirm');
const emailConfirm = new Modal('email-confirm');
const toResponse = new Modal('to-response');
const signinModal = new Modal('signin');
const loginModal = new Modal('login');
const loginTask = new Modal('login-task');
const unsubscrip = new Modal('unsubscrip');
const changesubscrip = new Modal('changesubscrip');
const addAdv = new Modal('add-adv');
const menuNotification = new Modal('notice');

if (document.querySelector('.notice-over')) {
    document.querySelector('.notice-over').addEventListener('click', () => {
        menuNotification.close()
    })
}

// hide-address
if (document.querySelector('.switch--hide-address')) {
    const hideAddressInput = document.querySelector('.switch--hide-address input')
    const hideAddressYes = document.querySelector('.hide-address-yes')
    hideAddressInput.addEventListener('change', () => {
        if (hideAddressInput.checked) {
            hideAddressInput.checked = false;
            hideAddress.open()
        }
    })
    hideAddressYes.addEventListener('click', () => {
        hideAddressInput.checked = true;
    })
}

// Switcher
class Switcher {
    constructor(name) {
        this.trigger = document.querySelector(`input[name="${name}"]`)
        this.blocks = document.querySelectorAll(`.${name}`)
        this.setUp()
    }
    setUp() {
        if (this.trigger) {
            this.change()
            this.hendler()
        }
    }
    change() {
        if (this.trigger.checked) {
            this.blocks[0].classList.remove('active')
            this.blocks[1].classList.add('active')
        } else {
            this.blocks[0].classList.add('active')
            this.blocks[1].classList.remove('active')
        }
    }
    hendler() {
        this.trigger.addEventListener('change', (e) => {
            this.change()
        })
    }
    on() {
        this.trigger.checked = true;
        this.change()
    }
    off() {
        this.trigger.checked = false;
        this.change()
    }
}

const generalInfoEdit = new Switcher('general-info-edit');
const performerInfoEdit = new Switcher('performer-info-edit');
const typesServicePriceEdit = new Switcher('types-service-price');
//typesServicePriceEdit.on()
const portfolioInfoEdit = new Switcher('portfolio-info-edit');

// tab
function tab(parent, i = 0) {
    try {
        let p = parent
        let t = p.querySelectorAll('.js-tab')
        let b = p.querySelectorAll('.js-tab-block')

        function tabActive(index) {
            t.forEach(item => {
                item.classList.remove('active')
            });
            t[index].classList.add('active')
            b.forEach(item => {
                item.classList.remove('active')
            });
            b[index].classList.add('active')
        }

        tabActive(i)

        t.forEach((element, index) => {
            element.addEventListener('click', function (e) {
                e.preventDefault()
                tabActive(index)
            })
        });
    } catch {
        console.log('tabs error')
    }
}

const myTabs = document.querySelectorAll('.js-tab-wrapper')
myTabs.forEach(element => {
    tab(element)
});

// error hint
const inputMSg = document.querySelectorAll('.i-msg')

inputMSg.forEach(item => {
    let input = item.querySelector('input')
    input.addEventListener('input', () => {
        item.classList.remove('error')
    })
})
// edit ava

const authorAvaInput = document.querySelector('.user__ava input');
if (authorAvaInput) {
    var cropAvaEl = document.querySelector('.crop-avatar');
    var cropAvaRotateLeft = document.querySelector('.edit-avatar__rotate-left');
    var cropAvaRotateRight = document.querySelector('.edit-avatar__rotate-right');
    var cropAvaUpload = document.querySelector('.edit-avatar__upload');
    var cropped = document.querySelector('.cropped');
    let authorAvaImg = document.querySelector('.user__ava img');
    let authorAvaImgSrc = authorAvaImg.src
    authorAvaInput.addEventListener('change', function (e) {
        if (authorAvaInput.files.length > 0) {
            authorAvaImg.src = window.URL.createObjectURL(authorAvaInput.files[0])
            authorAvaImgSrc = authorAvaImg.src
        }
        else {
            authorAvaImg.src = authorAvaImgSrc;
        }
        var cropAva = new Croppie(cropAvaEl, {
            viewport: { width: 100, height: 100, type: 'circle' },
            //boundary: { width: 500, height: 335 },
            //showZoomer: false,
            enableResize: true,
            enableOrientation: true,
            enableExif: true,
            //mouseWheelZoom: 'ctrl'
        });

        cropAvaRotateLeft.addEventListener('click', () => {
            cropAva.rotate(90)
        })
        cropAvaRotateRight.addEventListener('click', () => {
            cropAva.rotate(-90)
        })
        cropAvaUpload.addEventListener('click', () => {
            var size = 'viewport';
            cropAva.result('blob', {
                type: 'canvas',
                size: size,
                resultSize: {
                    width: 50,
                    height: 50
                }
            }).then(function (blob) {
            });
        })
    })
}

class UserAvatar {
    constructor(selector, options) {
        this.$element = document.querySelector('.edit-avatar')
        this.setUp()
    }
    setUp() {
        if (this.$element) {
            this.$file = this.$element.querySelector('.edit-avatar__file')
            this.$upload = this.$element.querySelector('.edit-avatar__upload')
            this.$contents = this.$element.querySelectorAll('.edit-avatar__content')
            this.imgPath = null;
            this.fileHendler()
            this.nextHendler()
            this.index = 0;
        }
    }
    fileHendler() {
        this.$file.addEventListener('change', () => {
            if (this.$file.files.length > 0) {
                this.imgPath = window.URL.createObjectURL(this.$file.files[0])
                cropAva.bind({
                    url: this.imgPath
                });
                this.next()
            }
        })
    }
    nextHendler() {
        this.$upload.addEventListener('click', () => {
            this.next()
        })
    }
    prev() {
        if (this.index != 0) {
            this.$contents[this.index].classList.remove('active')
            this.index--
            this.$contents[this.index].classList.add('active')
        }
    }
    next() {
        if (this.index < this.$contents.length - 1) {
            this.$contents[this.index].classList.remove('active')
            this.index++
            this.$contents[this.index].classList.add('active')
        }
    }
}
let editUserAvatar = new UserAvatar()

class AddPortfolio {
    constructor(selector, options) {
        this.$element = document.querySelector('.portfolio-info__block--edit')
        this.setUp()
    }
    setUp() {
        if (this.$element) {
            this.$file = this.$element.querySelector('.portfolio-info__input')
            this.$list = this.$element.querySelector('.portfolio-info__list')
            this.fileHendler()
            this.removeHendler()
        }
    }
    fileHendler() {
        this.$file.addEventListener('change', () => {
            if (this.$file.files.length > 0) {
                let path = this.imgPath = window.URL.createObjectURL(this.$file.files[0])
                this.addItem(path)
            }
        })
    }
    removeHendler() {
        this.$list.addEventListener('click', (e) => {
            if (e.target.dataset.portfolioremove) {
                this.removeItem(e.target.dataset.portfolioremove)
            }
        })
    }
    removeItem(id) {
        document.querySelector(`.portfolio-info__item[data-portfolio="${id}"]`).remove()
    }
    addItem(path) {
        let items = document.querySelectorAll('.portfolio-info__item')
        let id = items.length > 0 ? items[items.length - 1].getAttribute('data-portfolio') : 0
        this.$list.insertAdjacentHTML('beforeend', this.getTemplate(path, +id + 1))
        this.$file.value = ""
    }
    getTemplate(path, id) {
        return `
            <div class="portfolio-info__item" data-portfolio="${id}">
                <div class="portfolio-info__left">
                    <div class="portfolio-info__img">
                        <img src="${path}" alt="">
                    </div>
                    <div class="portfolio-info__remove" data-portfolioRemove="${id}">
                    </div>
                </div>
                <textarea name="" id="" class="portfolio-info__textarea"
                    placeholder="Описание работы.."></textarea>
            </div>
        `;
    }
}

const addPOrtfolio = new AddPortfolio()
// chart
if (document.querySelector('.statistics')) {
    var myLineChart;
    let statisticsChart = document.querySelector('.statistics__chart');
    let forTime = document.querySelectorAll('.statistics__filter .radio-btn__label');
    let perTimeRadioBtn = document.querySelector('.statistics__header .radio-btn');
    let perTime = perTimeRadioBtn.querySelectorAll('.radio-btn__label');
    let perDayInput = perTimeRadioBtn.querySelector('label[data-json="per-day"] input');
    function buildChart(nameJSON) {
        statisticsChart.innerHTML = ''
        statisticsChart.innerHTML = '<canvas id="myChart"></canvas>'
        var ctx = document.getElementById("myChart").getContext("2d");
        var gradientArea = ctx.createLinearGradient(0, 0, 0, 500);
        gradientArea.addColorStop(0, 'rgba(204, 40, 60, 0.6)');
        gradientArea.addColorStop(1, 'rgba(204, 40, 79, 0)');
        var gradientGrid = ctx.createLinearGradient(0, 0, 0, 500);
        gradientGrid.addColorStop(0, 'rgba(43, 50, 66, 0');
        gradientGrid.addColorStop(1, '#2B3242');

        const tooltip = {
            displayColors: false,
            backgroundColor: '#cc283c',
            padding: 9,
            cornerRadius: 16,
            titleAlign: 'center',
            callbacks: {
                title: function (context) {
                    return ''
                },
                label: function (context) {
                    return context.formattedValue + ' просмотров'
                }
            }
        };
        const config = {
            type: 'line',
            data: {
                datasets: [{
                    label: 'просмотров',
                    backgroundColor: gradientArea,
                    fillColor: gradientArea,
                    fill: 'start',
                    data: [{ x: '2016-12-25', y: 20 }, { x: '2016-12-26', y: 10 }]
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: tooltip,
                },
                elements: {
                    line: {
                        tension: 0.3,
                        borderWidth: 3,
                        borderColor: '#cc283c',
                    },
                    point: {
                        borderColor: '#cc283c',
                        borderWidth: 1,
                        radius: 3,
                        hoverRadius: 8,
                        hoverBorderWidth: 4
                    }
                },
                scales: {
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: "#2B3242",
                            font: {
                                size: 14,
                            }
                        },
                    },
                    x: {
                        grid: {
                            borderWeight: 3,
                            color: gradientGrid,
                            lineWidth: 1
                        },
                        ticks: {
                            color: "#2B3242",
                            //maxTicksLimit: 20,
                            //stepSize: 30,
                            font: {
                                size: 14,
                            }
                        }
                    },
                }
            }
        };
        try {
            const request = new XMLHttpRequest();
            request.open('GET', `js/${nameJSON}.json`);
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();
            request.addEventListener('readystatechange', function () {
                if (request.readyState === 4 && request.status === 200) {
                    let data = JSON.parse(request.response)
                    statisticsChart.style.width = data.data.length * 100 + 'px';
                    config.data.datasets[0].data = data.data
                    myLineChart = new Chart(ctx, config)
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    let curForTime = 'for-all-time';
    let curPerTime = 'per-day';
    buildChart(`${curForTime}-${curPerTime}`)

    forTime.forEach(item => {
        item.addEventListener('click', function () {
            curForTime = item.getAttribute('data-json')
            perTimeRadioBtn.classList.remove('disabled')
            if (curForTime == 'for-week' || curForTime == 'for-month') {
                curPerTime = 'per-day'
                perTimeRadioBtn.classList.add('disabled')
                perDayInput.checked = true;
            }
            buildChart(`${curForTime}-${curPerTime}`)
        })
    })

    perTime.forEach(item => {
        item.addEventListener('click', function () {
            curPerTime = item.getAttribute('data-json')
            buildChart(`${curForTime}-${curPerTime}`)
        })
    })

}


// slider perf
var perf = new Swiper('.perf-top__swiper', {
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.perf-top__next',
        prevEl: '.perf-top__prev',
        disabledClass: 'disabled',
    },
});

if (document.querySelector('.leave-review__star')) {
    const itemStars = document.querySelectorAll('.leave-review__stars')
    itemStars.forEach(element => {
        const stars = element.querySelectorAll('.leave-review__star')
        element.addEventListener('click', (e) => {
            const tar = e.target
            if (tar.classList.contains('active')) {
                stars.forEach(i => { i.classList.remove('active') })
            } else {
                stars.forEach(i => { i.classList.remove('active') })
                tar.classList.add('active')
            }
        })
    })
}


// to order

class Percent {
    constructor(slector) {
        this.element = document.querySelector(slector)
        this.setup()
    }
    setup() {
        if (!this.element) return;
        this.circle = this.element.querySelector('circle')
        this.num = this.element.querySelector('.svgpercent__num')
        this.num2 = document.querySelector('.order-create__text2 b')
        this.radius = +this.circle.getAttribute('r')
        this.circumference = this.radius * 2 * Math.PI
        this.circle.style.strokeDashoffset = this.circumference
        this.circle.style.strokeDasharray = this.circumference
    }
    set(percent) {
        if (!this.element) return;
        this.num.textContent = percent + '%'
        this.num2.textContent = percent + '%'
        this.circle.style.strokeDashoffset = this.circumference - (this.circumference * percent / 100)
    }
}

const svgPerscent = new Percent('.svgpercent')
svgPerscent.set(0) // установить прогресс на 90%


// slider order-create__catalog
var orderCreateCatalog = new Swiper('.order-create__catalog', {
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.order-create__catalog-next',
        prevEl: '.order-create__catalog-prev',
        disabledClass: 'disabled',
    },
});


// 

class TemplateResult {
    constructor() {

    }
    setHTML(attr, type, arr, pre = '') {
        const el = document.querySelector(`.result *[data-result="${attr}"]`)
        el.innerHTML = ''
        arr.forEach(text => {
            el.insertAdjacentHTML('beforeend', this.getTemp(type, text, pre))
        })
    }
    getTemp(type, text, pre) {
        if (type == 'tag') {
            return `<div class="result__teg">${text}</div>`;
        } else if (type == 'text') {
            return `<div class="result__text">${text}</div>`;
        } else if (type == 'price') {
            return `<div class="result__text">${pre} ${text} <b class="cur">€</b></div>`;
        }
    }
}

const templateResult = new TemplateResult()
// service check to order templateResult.setHTML()

class OrderCheckServise {
    constructor() {
        this.$element = document.querySelector('.order-create__catalog-wrapper')
        this.data = {
            boolean: false,
            checkedServices: []
        }
        this.setUp()
    }
    setUp() {
        if (this.$element) {
            this.$tabs = this.$element.querySelectorAll('.order-create__catalog-item')
            this.$tabTitiles = this.$element.querySelectorAll('.order-create__catalog-title')
            this.$block = this.$element.querySelector('.order-create__blocks')
            this.$blocks = this.$element.querySelectorAll('.order-create__block')
            this.$inputs = this.$block.querySelectorAll('input')
            this.$more = document.querySelector('.order-create__more')
            this.$totalWrap = document.querySelector('.order-create__total-select')
            this.$total = document.querySelector('.order-create__total-select span')
            this.$search = this.$element.querySelector('.order-create__search .search-o')
            this.$searchInput = this.$element.querySelector('.order-create__search .search-o__input')
            this.$searchDrop = this.$element.querySelector('.order-create__search .search-o__drop')
            this.$searchClose = this.$element.querySelector('.order-create__search .search-o__remove')
            this.$brc = document.querySelector('.order-create__services')
            this.brcDefaultText = this.$brc.textContent
            this.checkHendler()
            this.tab(this.$element)
            this.moreHendler()
            this.searchHendler()
        }
    }
    checkHendler() {
        this.$blocks.forEach((item, index) => {
            item.addEventListener('click', () => {
                let num = this.check(this.$blocks[index], index)
                // if (num == 0) {
                //     this.$tabs[index].classList.remove('selected')
                // } else {
                //     this.$tabs[index].classList.add('selected')
                // }
            })
        })
    }
    check(item, index) {
        const inputs = item.querySelectorAll('input')
        let num = 0;
        inputs.forEach(item => {
            if (item.checked) ++num;
        })
        if (num == 0) {
            this.$tabs[index].classList.remove('selected')
        } else {
            this.$tabs[index].classList.add('selected')
        }
        this.$tabs[index].querySelector('.order-create__catalog-num').textContent = num;
        this.$total.textContent = this.count()
        return num;
    }
    count() {
        const inputs = this.$block.querySelectorAll('input')
        let num = 0;
        inputs.forEach(item => {
            if (item.checked) {
                ++num;
                this.data.checkedServices.push(item.getAttribute('name'))
            }
        })
        if (num == 0) {
            this.$totalWrap.classList.add('hide')
            this.data.checkedServices = []
            this.data.boolean = false
        } else {
            this.$totalWrap.classList.remove('hide')
            this.data.boolean = true
        }
        return num;
    }
    moreHendler() {
        this.$more.addEventListener('click', () => {
            this.$block.classList.add('show-services')
        })
    }
    searchHendler() {
        this.$searchInput ? this.$searchInput.addEventListener('input', (e) => {
            e.preventDefault()
            this.$searchInput.value = this.$searchInput.value.trim()
            this.$search.classList.add('active')
            this.$searchDrop.innerHTML = ''
            let arr = this.search()
            arr.forEach(item => {
                this.$searchDrop.insertAdjacentHTML('beforeend', item.html)
            })
            if (arr.length == 0) this.$searchDrop.innerHTML = '<div>не найдено</div>';
            if (this.$searchInput.value == '') this.$search.classList.remove('active');
        }) : null;
        this.$searchClose ? this.$searchClose.addEventListener('click', (e) => {
            e.preventDefault()
            this.searchClose()
        }) : null;
        this.$searchDrop ? this.$searchDrop.addEventListener('click', (e) => {
            e.preventDefault()
            let tar = e.target
            let name = tar.dataset.name
            let catalog = tar.dataset.catalog
            this.$inputs.forEach(item => {
                if (item.getAttribute('name') == name) {
                    item.checked = true;
                    this.$blocks.forEach(i => {
                        if (i.getAttribute('data-catalog') == catalog) {
                            this.check(i, +catalog)
                        }
                    })
                }
            })
            this.searchClose()
        }) : null;
    }
    searchClose() {
        this.$search.classList.remove('active')
        this.$searchInput.value = ''
    }
    search() {
        let rex = new RegExp('.*(' + this.$searchInput.value + ')+.*', 'i');
        let rep = new RegExp(this.$searchInput.value, 'i');
        let arr = []
        this.$inputs.forEach(item => {
            let text = item.getAttribute('name')
            let id = item.getAttribute('data-catalog')
            if (rex.test(text.replace(/[^\wа-яё]+/gi, ""))) {
                arr.push({
                    id: id,
                    text: text,
                    html: `<div data-catalog='${id}' data-name='${text}'>` + text.replace(rep, `<span data-catalog='${id}' data-name='${text}'>${this.$searchInput.value}</span>`) + `<b data-catalog='${id}' data-name='${text}'>${this.$tabTitiles[id].textContent}</b></div>`
                })
            }
        })
        return arr;
    }
    tab(parent, i = 0) {
        try {
            let p = parent
            let t = p.querySelectorAll('.order-create__catalog-item')
            let b = p.querySelectorAll('.order-create__block')

            function tabActive(index) {

                t.forEach(item => {
                    item.classList.remove('active')
                });
                t[index].classList.add('active')
                b.forEach(item => {
                    item.classList.remove('active')
                });
                b[index].classList.add('active')
            }

            //tabActive(i)

            t.forEach((element, index) => {
                element.addEventListener('click', (e) => {
                    e.preventDefault()
                    this.$more.classList.remove('hide')
                    this.$block.classList.remove('show-services')
                    tabActive(index)
                })
            });
        } catch {
            console.log('tabs error')
        }
    }
    okey() {
        if (this.data.checkedServices.length > 0) {
            this.data.boolean = true;
            this.$brc.innerHTML = ''
            this.data.checkedServices.forEach(item => {
                this.$brc.insertAdjacentHTML('beforeend', `<span>${item}</span>`)
            })
            templateResult.setHTML('services', 'tag', this.data.checkedServices)
        } else {
            this.data.boolean = false;
            this.$brc.innerHTML = ''
            this.$brc.insertAdjacentHTML('beforeend', `<span>${this.brcDefaultText}</span>`)
        }
        return this.data;
    }
}

const orderCheckServise = new OrderCheckServise();

// local check
class LocalCheckSwitcher {
    constructor() {
        this.$element = document.querySelector('.localCheck')
        this.data = {
            boolean: false,
            addresses: [],
            address: null,
            city: null,
            type: 'home-out',
            value: 'home-out'
        }
        this.setup()
    }
    setup() {
        if (this.$element) {
            this.$inputs = this.$element.querySelectorAll('input[name="order-local"]')
            this.$blocks = this.$element.querySelectorAll('.order-create__local')
            this.$addressInput = this.$element.querySelector('.order-local__address-input')
            this.switchhendler()
            this.data.value = this.$inputs[0].getAttribute('data-value');
        }
    }
    switchhendler() {
        this.$inputs.forEach(item => {
            item.addEventListener('change', () => {
                selOrderLocal.reset()
                searchAdsressOut.reset()
                this.$addressInput.value = ''
                this.data.boolean = false
                this.switcher()
            })
        })
    }
    switcher() {
        this.$blocks.forEach(i => { i.classList.remove('active') })
        this.$inputs.forEach(input => {
            if (input.checked == true) {
                this.data.type = input.value;
                this.data.value = input.getAttribute('data-value');
                document.querySelector(`.order-create__local--${input.value}`).classList.add('active')
            }
        })
    }
    setAddresses(arr) {
        this.data.addresses = arr;
    }
    setAddress(text = this.$addressInput.value) {
        this.data.address = text;
    }
    okey() {
        if (this.$addressInput.value.trim() != '' && this.data.city != null || this.data.addresses.length > 0) {
            this.data.boolean = true;
            templateResult.setHTML('where', 'text', [this.data.value])
            if (this.data.addresses.length > 0) {
                templateResult.setHTML('address', 'tag', this.data.addresses)
            } else {
                this.setAddress()
                templateResult.setHTML('address', 'text', [this.data.city + ', ' + this.data.address])
            }
        } else {
            this.data.boolean = false;
        }
        return this.data;
    }
}

const localCheckSwitcher = new LocalCheckSwitcher()


const selOrderLocal = new Select('.select--order-local', {
    local: true,
    noinput: true,
    callBack(data) {
        if (data.value == data.defaultVal) {
            localCheckSwitcher.data.city = null;
        } else {
            localCheckSwitcher.data.city = data.value;
        }
    }
})

// service check to order

class SearchAdsressOut {
    constructor() {
        this.$element = document.querySelector('.searchAdsressOut')
        this.setUp()
    }
    setUp() {
        if (this.$element) {
            this.$search = this.$element.querySelector('.search-o')
            this.$searchInput = this.$element.querySelector('.search-o__input')
            this.$searchItems = this.$element.querySelectorAll('.search-o__list .search-o__list-item')
            this.$searchDrop = this.$element.querySelector('.search-o__drop')
            this.$searchClose = this.$element.querySelector('.search-o__remove')
            this.$searchChecked = this.$element.querySelector('.order-local__checked-addresses')
            this.$searchCheckedAddresses = this.$searchChecked.querySelectorAll('span')
            this.searchHendler()
            this.removeHendler()
        }
    }
    searchHendler() {
        this.$searchInput ? this.$searchInput.addEventListener('input', (e) => {
            e.preventDefault()
            this.$searchInput.value = this.$searchInput.value.trim()
            this.$search.classList.add('active')
            this.$searchDrop.innerHTML = ''
            let arr = this.search()
            arr.forEach(item => {
                this.$searchDrop.insertAdjacentHTML('beforeend', item.html)
            })
            if (arr.length == 0) this.$searchDrop.innerHTML = '<div>не найдено</div>';
            if (this.$searchInput.value == '') this.$search.classList.remove('active');
        }) : null;
        this.$searchClose ? this.$searchClose.addEventListener('click', (e) => {
            e.preventDefault()
            this.searchClose()
        }) : null;
        this.$searchDrop ? this.$searchDrop.addEventListener('click', (e) => {
            e.preventDefault()
            let tar = e.target
            let text = tar.textContent
            if (tar.dataset.adres == 'true') {

                this.$searchChecked.querySelectorAll('span').forEach(i => {
                    if (i.textContent == text) {
                        i.remove()
                    }
                })
                this.$searchChecked.insertAdjacentHTML('beforeend', `<span>${text}</span>`)
                this.setAddresses()
            }
            this.searchClose()
        }) : null;
    }
    searchClose() {
        this.$search.classList.remove('active')
        this.$searchInput.value = ''
    }
    search() {
        let rex = new RegExp('.*(' + this.$searchInput.value + ')+.*', 'i');
        let rep = new RegExp(this.$searchInput.value, 'i');
        let arr = []
        this.$searchItems.forEach(item => {
            let text = item.textContent
            if (rex.test(text.replace(/[^\wа-яё]+/gi, ""))) {
                arr.push({
                    text: text,
                    html: `<div data-adres="${true}">` + text.replace(rep, `<span data-adres="${true}">${this.$searchInput.value}</span>`) + `</div>`
                })
            }
        })
        return arr;
    }
    removeHendler() {
        this.$searchChecked.addEventListener('click', (e) => {
            this.remove(e)
        })
    }
    remove(e) {
        if (e.target.tagName == "SPAN") {
            e.target.remove()
            this.setAddresses()
        }
    }
    reset() {
        this.searchClose()
        this.$searchChecked.innerHTML = ''
    }
    setAddresses() {
        let arr = []
        this.$searchChecked.querySelectorAll('span').forEach(item => {
            arr.push(item.textContent)
        })
        localCheckSwitcher.setAddresses(arr)
    }
}

const searchAdsressOut = new SearchAdsressOut()

// date

class DateCheck {
    constructor() {
        this.$element = document.querySelector('.DateCheck')
        this.data = {
            boolean: false,
            dateSourse: [],
            dates: [],
            partDay: null,
            anytime: false,
            anotherDate: false
        }
        this.setup()
    }
    setup() {
        if (this.$element) {
            this.$partDays = this.$element.querySelectorAll('input[name="part-day"]')
            this.$anytime = this.$element.querySelector('input[name="anytime"]')
            this.$another = this.$element.querySelector('input[name="another-date"]')
            this.hendler()
            this.partDay()
        }
    }
    hendler() {
        this.$partDays.forEach(item => {
            item.addEventListener('change', () => {
                this.partDay()
            })
        })
        this.$anytime.addEventListener('change', () => {
            this.anytime()
        })
        this.$another.addEventListener('change', () => {
            this.another()
        })
    }
    partDay() {
        this.$anytime.checked = false
        this.data.anytime = null;
        this.data.partDay = []
        this.$partDays.forEach(i => {
            if (i.checked == true) {
                this.data.partDay.push(i.getAttribute('value'))
            }
        })

    }
    anytime() {
        if (this.$anytime.checked) {
            this.$partDays.forEach(i => { i.checked = false })
            this.data.partDay = []
            this.data.anytime = this.$anytime.value
        } else {
            this.data.anytime = null;
        }
    }
    another() {
        if (this.$another.checked) {
            this.data.anotherDate = this.$another.value
        } else {
            this.data.anotherDate = null;
        }
    }
    beautyDate(arr) {
        let a = []
        arr.forEach(item => {
            a.push(item.startDate.toLocaleString('default', { month: 'long', day: 'numeric' }))
        })
        return a;
    }
    okey() {
        this.data.dates = this.beautyDate(this.data.dateSourse)
        if (this.data.dates.length > 0) {
            this.data.boolean = true
            if (this.data.anytime) {
                templateResult.setHTML('part-day', 'text', [this.data.anytime])

            } else {
                templateResult.setHTML('part-day', 'text', this.data.partDay)
            }
            templateResult.setHTML('date', 'tag', this.data.dates)
            if (this.data.anotherDate) {
                templateResult.setHTML('another-date', 'tag', [this.data.anotherDate])
            } else {
                templateResult.setHTML('another-date', 'tag', [])
            }

        }
        return this.data;
    }
}
const dateCheck = new DateCheck()

if (document.querySelector('.cldr__calendar')) {
    let calendar = new Calendar('.cldr__calendar', {
        startDate: new Date(),
        dataSource: dateCheck.data.dateSourse,
    })
    //calendar.setDataSource(dataSource);
    const calendarEl = document.querySelector('.cldr')
    let dates = {}

    calendarEl.classList.add('prev-disabled')
    document.querySelector('.cldr__calendar').addEventListener('periodChanged', function (e) {
        if (e.startDate.getFullYear() - new Date().getFullYear() >= 0) {
            if (e.startDate.getFullYear() - new Date().getFullYear() == 0) {
                calendarEl.classList.add('prev-disabled')
            } else {
                calendarEl.classList.remove('prev-disabled')
            }
        } else {
            calendarEl.classList.add('prev-disabled')
        }
        calendar.setDataSource(dateCheck.data.dateSourse);
        // console.dir(dateCheck.data.dateSourse)
    })
    let checkedDate;
    document.querySelector('.cldr__calendar').addEventListener('clickDay', function (e) {
        if (checkDate(e.date)) {
            dateCheck.data.dateSourse.splice(checkedDate, 1)
            e.element.classList.add('day-uncheck')
            e.element.classList.remove('day-check')
        } else {
            dateCheck.data.dateSourse.push({
                startDate: new Date(e.date),
                endDate: new Date(e.date),

            })
            e.element.classList.remove('day-uncheck')
            e.element.classList.add('day-check')
        }
    })

    function checkDate(date) {
        for (let i = 0; i < dateCheck.data.dateSourse.length; i++) {
            if ('' + dateCheck.data.dateSourse[i].startDate == '' + date) {
                checkedDate = i;
                return true;
            }
        }
        return false;

    }

    document.querySelector('.months-container').classList.add('swiper-wrapper')
    document.querySelectorAll('.month-container').forEach(i => i.classList.add('swiper-slide'))
    var orderCreateCatalog;
    setTimeout(() => {
        orderCreateCatalog = new Swiper('.cldr__calendar', {
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.order-create__cal-next',
                prevEl: '.order-create__cal-prev',
                disabledClass: 'disabled',
            },
        });
    }, 10000)
}


//OrderPrice
class OrderPrice {
    constructor() {
        this.$element = document.querySelector('.order-price')
        this.data = {
            boolean: false,
            from: null,
            to: null,
            any: null,
            frompretext: null,
            topretext: null,
        }
        this.setUp()
    }
    setUp() {
        if (this.$element) {
            this.$inputs = this.$element.querySelectorAll('.order-price__item input')
            this.$from = this.$element.querySelector('.order-price__item input[name="price-from"]')
            this.$to = this.$element.querySelector('.order-price__item input[name="price-to"]')
            this.$checkbox = this.$element.querySelector('.order-price__checkbox')
            this.inputsHendler()
            this.checkboxHendler()
            this.data.frompretext = this.$from.getAttribute('data-pretext');
            this.data.topretext = this.$to.getAttribute('data-pretext');
        }
    }
    inputsHendler() {
        this.$inputs.forEach(i => {
            i.addEventListener('input', () => {
                this.$checkbox.checked = false
                this.data.any = null
            })
        })
    }
    checkboxHendler() {
        this.$checkbox.addEventListener('change', () => {
            if (this.$checkbox.checked == true) {
                this.data.any = this.$checkbox.getAttribute('value')
                this.data.from = null;
                this.data.to = null;
                this.$inputs.forEach(i => { i.value = '' })
            }
        })
    }
    okey() {
        this.data.from = this.$from.value
        this.data.to = this.$to.value
        if (this.data.from != '' && this.data.to != null || this.data.any) {
            this.data.boolean = true;
            if (this.data.any) {
                templateResult.setHTML('price-any', 'text', [this.data.any])

                templateResult.setHTML('price-from', 'price', [], this.data.frompretext)
                templateResult.setHTML('price-to', 'price', [], this.data.topretext)
            } else {
                templateResult.setHTML('price-any', 'text', [])

                templateResult.setHTML('price-from', 'price', [this.data.from], this.data.frompretext)
                templateResult.setHTML('price-to', 'price', [this.data.to], this.data.topretext)
            }
        } else {
            this.data.boolean = false;
        }
        return this.data;
    }
}

const orderPrice = new OrderPrice()
// order comment

class OrderComment {
    constructor() {
        this.$element = document.querySelector('.order-comm__textarea')
        this.data = {
            boolean: null,
            text: null
        }
        this.setup()
    }
    setup() {
        if (this.$element) {
            this.$resultBlock = document.querySelector('.result__item--comment')

        }
    }
    okey() {
        this.data.text = this.$element.value
        if (this.$element.value.trim() == '') {
            this.data.boolean = null
            this.$resultBlock.classList.add('hide')
        } else {
            this.data.boolean = true
            templateResult.setHTML('comment', 'text', [this.$element.value])
            this.$resultBlock.classList.remove('hide')
        }
        return this.data;
    }

}

const orderComment = new OrderComment()
// AddOrderPortfolio
class AddOrderPortfolio {
    constructor(selector, options) {
        this.$element = document.querySelector('.order-comm__files')
        this.setUp()
        this.id = 0;
        this.data = {
            boolean: false
        }
    }
    setUp() {
        if (this.$element) {
            this.$item = this.$element.querySelector('.order-comm__item:last-child')
            this.$file = this.$element.querySelector('.order-comm__item:last-child input')
            this.$img = this.$element.querySelector('.order-comm__item:last-child img')
            this.$resultBlock = document.querySelector('.result__item--images')
            this.$result = document.querySelector('.result__item--images .result__left')
            this.fileHendler()
            this.removeItemHendler()
        }
    }
    fileHendler() {
        this.$file.addEventListener('change', () => {
            if (this.$file.files.length > 0) {
                this.$img.setAttribute('src', window.URL.createObjectURL(this.$file.files[0]))
                this.$item.classList.add('active')
                this.addToResult(window.URL.createObjectURL(this.$file.files[0]), this.id)
                this.id++
                this.addItem()
                this.addFileHendler()
            }
        })
    }
    addFileHendler() {
        this.$item = this.$element.querySelector('.order-comm__item:last-child')
        this.$file = this.$element.querySelector('.order-comm__item:last-child input')
        this.$img = this.$element.querySelector('.order-comm__item:last-child img')
        this.fileHendler()
    }
    removeItemHendler() {
        this.$element.addEventListener('click', function (e) {
            const tar = e.target;
            const id = tar.dataset.img;
            if (tar.classList.contains('order-comm__item')) {
                tar.remove()
                document.querySelector(`.result__img[data-img="${id}"]`).remove()
            }
        })
    }
    addItem() {
        this.$element.insertAdjacentHTML('beforeend', `
            <div class="order-comm__item" data-img="${this.id}">
                <div class="order-comm__img">
                    <img src="" alt="">
                </div>
                <label class="order-comm__label">
                    <input type="file" hidden>
                </label>
            </div>
        `)
    }
    addToResult(src, id) {
        this.$result.insertAdjacentHTML('beforeend', `
            <img src="${src}" alt="" class="result__img" data-img="${id}">
        `)

    }
    okey() {
        if (document.querySelectorAll(`.result__img`).length > 0) {
            this.data.boolean = true;
            this.$resultBlock.classList.remove('hide')
        } else {
            this.data.boolean = false;
            this.$resultBlock.classList.add('hide')
        }
        return this.data;
    }
}

const addOrderPOrtfolio = new AddOrderPortfolio()




class Order {
    constructor(selector, options) {
        this.$element = document.querySelector('.order-create')
        this.setUp()
        this.data = {

        }
    }
    setUp() {
        if (this.$element) {
            this.$prev = this.$element.querySelector('.order-create__back')
            this.$next = this.$element.querySelector('.order-create__contune')
            this.$total = this.$element.querySelector('.order-create__total-page')
            this.$current = this.$element.querySelector('.order-create__cur-page')
            this.$contents = this.$element.querySelectorAll('.order-create__content')
            this.$bottom = this.$element.querySelector('.order-create__bot')
            this.$editBtns = this.$element.querySelectorAll('.result__edit')
            this.$errores = this.$element.querySelectorAll('.order-create__dangerous')
            this.index = 0;
            this.prevIndex = null;
            this.nextIndex = 1;
            this.total = this.$contents.length
            this.prevHendler()
            this.nextHendler()
            this.setCurPageNum(1)
            this.setTotPageNum(this.total)
            this.eidtHendler()
            this.pageChecks = [orderCheckServise, localCheckSwitcher, dateCheck, orderPrice, orderComment]
        }
    }
    prevHendler() {
        this.$prev.addEventListener('click', () => {
            this.prev()
        })
    }
    nextHendler() {
        this.$next.addEventListener('click', () => {
            this.next()
        })
    }
    setCurPageNum(num) {
        this.$current.textContent = num;
    }
    setTotPageNum(num) {
        this.$total.textContent = num;
    }
    prev() {
        this.changeTo(this.index - 1)
    }
    setPrevIndex(index) {
        this.index = index
        if (index <= 0) {
            this.prevIndex = null
        } else {
            this.prevIndex = --index
        }
    }
    next() {
        this.changeTo(this.index + 1)
    }
    setNextIndex(index) {
        this.index = index
        if (index == this.total - 1) {
            this.nextIndex = null
        } else {
            this.nextIndex = ++index
        }
    }
    changeTo(index) {
        this.hideErrores()
        if (index <= this.total - 1 && index >= 0) {
            if (index == 0) {
            } else {
                if (this.pageChecks[index - 1].okey().boolean == false) {
                    this.showError(index - 1)
                    return;
                };
            }
            this.$contents.forEach(i => i.classList.remove('active'))
            this.$contents[index].classList.add('active')
            this.index = index
            this.setPrevIndex(index)
            this.setNextIndex(index)
            this.setCurPageNum(index + 1)
        }
        this.$bottom.classList.remove('hide')
        this.$prev.classList.remove('hide')
        if (this.nextIndex == null) {
            this.$bottom.classList.add('hide')
        } else if (this.prevIndex == null) {
            this.$prev.classList.add('hide')
        } else {
        }
        svgPerscent.set(this.setPercent())
    }
    setPercent() {
        const full = +this.pageChecks.length + 1
        let progress = 0;
        this.pageChecks.forEach(item => {
            if (item.okey().boolean) {
                progress++
            }
        })
        if (addOrderPOrtfolio.okey().boolean) {
            progress++
        }
        return Math.floor(progress * 100 / full);
    }
    showError(index) {
        this.$errores[index].classList.add('show')
    }
    hideErrores() {
        this.$errores.forEach(i => { i.classList.remove('show') })
    }
    eidtHendler() {
        this.$editBtns.forEach(item => {
            item.addEventListener('click', () => {
                let index = +item.getAttribute('data-content')
                this.changeTo(index)
            })
        })
    }

    okey() {
        const arr = []
        //obj.arr = 
        this.pageChecks.forEach(item => {
            arr.push(item.okey())
        })
        return arr;
    }
}
const order = new Order()

//order end

// навигация по странице
const navScroll = (sect, navs, blocks) => {
    let section = document.querySelector(sect);
    let anchorLinks = section.querySelectorAll(navs);
    let anchorBlocks = document.querySelectorAll(blocks);

    let heightSum = 0;
    let comp = 600;
    let click = false;

    anchorLinks.forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault()
            click = true;
            let href = this.getAttribute('data-href')
            let block = section.querySelector(`[id="${href}"]`)
            let sizeScroll = block.getBoundingClientRect().top + pageYOffset
            anchorLinks.forEach(element => {
                element.classList.remove('active');
            })
            element.classList.add('active')
            window.scrollTo({
                top: sizeScroll - comp / 2,
                behavior: "smooth",
            })
            setTimeout(() => {
                click = false;
            }, 1000)
        })
    });

    window.addEventListener('scroll', function () {

        function getCoords(elem) {
            let box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset,
                y: box.y,
                x: box.x,
                height: box.height,
                width: box.width,
            };
        }
        if (!click) {
            anchorBlocks.forEach(element => {
                let coord = getCoords(element);
                if (-coord.height < coord.y && coord.y < heightSum + comp) {
                    let hrefAnchor = section.querySelector(`[data-href="${element.getAttribute('id')}"]`)
                    element.classList.add('onView');
                    anchorLinks.forEach(element => {
                        element.classList.remove('active');
                    })
                    hrefAnchor.classList.add('active')
                } else {
                    element.classList.remove('onView')
                }
            })
        }
    })
}

navScroll_ = navScroll

if (document.querySelector('.politica-info__function')) {
    navScroll('.politica-info', '.politica-info__point', '.politica-info__item')
}
if (document.querySelector('.information')) {
    navScroll('.information', '.information__point', '.information__about *[id]')
}




// nav
const nav = document.querySelector('.nav')
const burger = document.querySelector('.burger')
const navClose = document.querySelector('.nav__close')
burger ? burger.addEventListener('click', function () {
    nav.classList.add('active')
    select_html.classList.add('o-hidden')
}) : null;
navClose ? navClose.addEventListener('click', function () {
    nav.classList.remove('active')
    select_html.classList.remove('o-hidden')
}) : null;


//Правки

if ($(window).width() <= 768) {
    let abs = document.querySelectorAll('.services-list__sub-text');

    for (let i = 0; i < abs.length; i++) {
        let element = abs[i];
        element.innerHTML = element.innerHTML.trim().slice(0, -6) + '.';
    }
}

if ($(window).width() <= 768) {
    $('.hint').click(function () {
        $(this).toggleClass('active');
    });
}

$('.pa-sidebar__filter').click(function () {
    $(this).toggleClass('active').next().slideToggle();
});

$('.statistics__filter-item').click(function (e) {
    // e.preventDefault();
    $('.statistics__filter-item').removeClass('active');
    $(this).addClass('active');
});

if ($(window).width() <= 768) {
    $('.statistics__filter .select_checked').click(function () {
        $(this).next().slideToggle();
    });

    $('.statistics__filter-item').click(function () {
        var value = $(this).attr('data-value');
        $(this).parent().parent().parent().find('.statistics__filter-select').val(value);
        $(this).parent().parent().find('.select_checked').find('.select-text').text(value);
        $(this).parent().slideUp();
    });
}

$('.add-adv__inner .search-item__input').on('keyup', function () {
    var $this = $(this),
        val = $this.val();

    if (val.length >= 1) {
        $(this).parent().addClass('active');
    } else {
        $(this).parent().removeClass('active');
    }
});