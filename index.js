import { Selector, Role } from 'testcafe';
import { loginAsHr } from './auth/logins';


const addSkill = async t => {
    await t
        .typeText(Selector('div[form=skill-form] > div > input[name=name]'), "Sample Skill")
        .click(Selector('label').withText('Skill level'))
        .click(Selector('.MuiListItem-root').withText('Regular'))
        .click(Selector('button').withText('ADD SKILL'))
}

const addOffer = async t => {
    await t
        .typeText(Selector('input[name=name]'), "Sample offer from tests")
        .typeText(Selector('input[name=position]'), "Sample position from tests")
        .typeText(Selector('input[name=localization]'), "Sample localization")
        .typeText(Selector('input[name=minSalary]'), "1000")
        .typeText(Selector('input[name=maxSalary]'), "2000")
        .typeText(Selector('textarea[name=description]'), "It's just an offer from E2E testing, it should be deleted")
    
    await addSkill(t)
    
    await t
        .click(Selector('button').withText('SAVE OFFER'))
        .click(Selector('button').withText('OK'))
}

const openOffer = async (t, offerName) => {
    await t
        .click(Selector('.MuiAvatar-root'))
        .click(Selector('.MuiListItem-root').withText('My offers'))
        .click(Selector('h5').withText(offerName))
}

const deleteOffer = async t => {
    await t
        .click(Selector('p').withText('DELETE'))
        //close swal - shouldn't we ask about being sure?
        .click(Selector('button').withText('Ok'))
}

fixture `E-Stella`
    .page `https://e-stella-agh.github.io/MainFrontApp/#/`;


test("Should be able to create offer as HR and then delete it", async t => {

    await loginAsHr(t)

   await t
        .click(Selector('.MuiAvatar-root'))
        .click(Selector('.MuiListItem-root').withText('Create offer'))
        
    await addOffer(t)

    await openOffer(t, "Sample offer from tests")

    await deleteOffer(t)

    const offerExists = Selector('h5').withText('Sample offer from tests').exists
    await t.expect(offerExists).notOk()
})