const { VK, Keyboard } = require('vk-io');
const vk = new VK();
var colors = require('colors');

const token = 'vk1.a.8Ba7K1Wh25l_a6jqCf5cMjyMoa1K5UnKFAoL9tCq8dNOt4Z5fEbgPBLZY6Mus3sWvNC-qm0UVUn9M8svoQ1nubwFenlaUiJH1eYRoHJxmKSFNtR2qH_4z4DpahBjf3XA5t3jL9XUbfQWhL0AdWIYqnHJI-04gUzQr0nsUB0vAuouohhXv0Be1Ukvlwfin6Jb';
const id = 202133184;
const apiMode = 'parallel';
const uri = 'https://vk.com/chaterbot';

vk.setOptions({
	token: token,
	apiMode: apiMode,
	pollingGroupId: id
})

const st = vk.updates;

module.exports = { vk, Keyboard, st, colors, id, uri };